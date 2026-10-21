import numpy as np
from PIL import Image, ImageFilter

def extract_logo():
    # 1. Load user original image
    src_path = r'C:\Users\Abhiwan Technology\.gemini\antigravity-ide\brain\f7bbd3c4-1a94-41cd-91ae-0e33fe29d80c\.user_uploaded\media_1792567947512.png'
    orig = Image.open(src_path).convert('RGB')
    
    # 2. Crop out the white strip at top (y: 31 to bottom)
    # Also find content horizontal boundaries
    crop = orig.crop((0, 31, orig.width, orig.height))
    arr = np.array(crop).astype(float)
    h, w, _ = arr.shape

    # Background color estimation:
    # Top-right corner and bottom-right corner samples
    bg_samples = np.vstack([arr[:10, -40:].reshape(-1, 3), arr[-10:, -40:].reshape(-1, 3)])
    bg = bg_samples.mean(axis=0) # [186, 33, 24] approx

    # Create alpha channel:
    # Foreground pixels are:
    # - Blue building: B > 80 or G > 60
    # - White text / building / dividers: G > 100 and B > 80
    # - Red building: in x: 40..85, y: 15..65, has highlights, dark shadows, specular reflections
    # - SPACES text: in x: 195..315, y: 20..48, R is significantly brighter than background (R > 210)
    
    alpha = np.zeros((h, w), dtype=float)

    for y in range(h):
        for x in range(w):
            r, g, b = arr[y, x]
            
            # Distance from background in RGB space
            # Background is very tight in G (~33) and B (~24)
            gb_dist = np.sqrt(((g - bg[1])*2.5)**2 + ((b - bg[2])*3.0)**2)
            r_diff = abs(r - bg[0])
            
            # 1. White/silver items (SMARTZ, white building, divider, subline, base)
            if g > 70 or b > 60:
                # Strong foreground
                a = np.clip((gb_dist - 10) / 25, 0.0, 1.0)
                alpha[y, x] = max(alpha[y, x], a)
                
            # 2. Blue building
            if b > 70 and b > r * 0.7:
                a = np.clip((b - 50) / 30, 0.0, 1.0)
                alpha[y, x] = max(alpha[y, x], a)

            # 3. Center red building (x: 45 to 88)
            if 48 <= x <= 88 and 14 <= y <= 65:
                # Shadow parts are dark: r < 140
                if r < 140:
                    a = np.clip((155 - r) / 35, 0.0, 1.0)
                    alpha[y, x] = max(alpha[y, x], a)
                # Highlights or specular edges:
                if g > 45 or b > 40:
                    a = np.clip((gb_dist - 8) / 20, 0.0, 1.0)
                    alpha[y, x] = max(alpha[y, x], a)
                # Facet body: within the polygon of the center tower
                # Apex ~ (66, 15), base ~ (52..86, 64)
                # Check if it's inside the tower footprint
                if 17 <= y <= 63 and 53 <= x <= 82:
                    # check top triangle
                    if y >= 25 or (y >= 16 and abs(x - 66) <= (y - 14)*1.3):
                        alpha[y, x] = max(alpha[y, x], 1.0)

            # 4. SPACES text (x: 200 to 310, y: 20 to 45)
            if 200 <= x <= 312 and 22 <= y <= 45:
                # SPACES is bright scarlet red (r ~ 220 to 255)
                if r > 195:
                    a = np.clip((r - 188) / 20, 0.0, 1.0)
                    alpha[y, x] = max(alpha[y, x], a)

            # 5. Divider line between emblem and SMARTZ (x: 95..105, y: 20..64)
            if 98 <= x <= 104 and 22 <= y <= 64:
                if g > 55 or b > 50 or r > 190:
                    alpha[y, x] = max(alpha[y, x], 1.0)

            # 6. Subline horizontal rule (y: 60..65)
            if 61 <= y <= 64 and 100 <= x <= 308:
                if g > 50 or b > 45 or r > 200:
                    alpha[y, x] = max(alpha[y, x], 1.0)

    # Clean color bleed: for semi-transparent edge pixels, un-premultiply background red
    clean_arr = arr.copy()
    for y in range(h):
        for x in range(w):
            a = alpha[y, x]
            if 0.05 < a < 0.95:
                # Unmix: C_fg = (C_obs - (1-a)*C_bg) / a
                for c_idx in range(3):
                    fg_est = (clean_arr[y, x, c_idx] - (1.0 - a) * bg[c_idx]) / a
                    clean_arr[y, x, c_idx] = np.clip(fg_est, 0, 255)

    # Assemble RGBA
    out = np.zeros((h, w, 4), dtype=np.uint8)
    out[:, :, :3] = np.clip(clean_arr, 0, 255).astype(np.uint8)
    out[:, :, 3] = (alpha * 255).astype(np.uint8)

    # Crop out transparent boundaries
    nz_y, nz_x = np.where(out[:, :, 3] > 15)
    if len(nz_y) > 0:
        pad = 6
        min_y = max(0, nz_y.min() - pad)
        max_y = min(h, nz_y.max() + pad)
        min_x = max(0, nz_x.min() - pad)
        max_x = min(w, nz_x.max() + pad)
        cropped_out = out[min_y:max_y, min_x:max_x]
    else:
        cropped_out = out

    img_out = Image.fromarray(cropped_out)
    img_out.save(r'public/images/logo-transparent.png')
    print('Saved public/images/logo-transparent.png with size:', img_out.size)

    # Also save emblem-only transparent
    emblem_w = int(cropped_out.shape[1] * 0.28)
    emblem_out = Image.fromarray(cropped_out[:, :emblem_w])
    emblem_out.save(r'public/images/logo-emblem-transparent.png')
    print('Saved public/images/logo-emblem-transparent.png')

if __name__ == '__main__':
    extract_logo()
