import { MessageCircle } from 'lucide-react'
import { whatsappHref } from '@/lib/site-config'

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Smartz Spaces on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  )
}
