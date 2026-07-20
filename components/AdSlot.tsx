import { ADS_ENABLED, ADSENSE_CLIENT_ID } from "@/lib/ads";

interface AdSlotProps {
  /** AdSense ad unit slot id — assigned when you create the unit in AdSense */
  slot: string;
  className?: string;
}

/**
 * Placeholder ad container. Renders nothing while ads are disabled, so it can
 * be placed in layouts now and lit up later by flipping ADS_ENABLED in
 * lib/ads.ts (after adding the AdSense <script> — see lib/ads.ts).
 */
export default function AdSlot({ slot, className }: AdSlotProps) {
  if (!ADS_ENABLED) {
    return null;
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
