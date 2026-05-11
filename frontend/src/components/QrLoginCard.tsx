
interface QrCardProps {
    qrcode: string
}

export default function QrCard({ qrcode }: QrCardProps) {
    return (
        <div className="p-8 flex flex-col items-center justify-center bg-zinc-900 rounded-xl gap-4">
            <h1 className="uppercase tracking-widest text-xs font-bold text-zinc-400">
                Scan with Authenticator
            </h1>
            <div className="bg-white p-3 rounded-lg">
                <img src={qrcode} alt="2FA QR Code" className="w-48 h-48" />
            </div>
            <p className="text-[10px] text-zinc-500 max-w-50 text-center">
                Scan this to generate your 6-digit verification code.
            </p>
        </div>
    );
}