// Public launch configuration, verified against BJCRUM on 24 September 2026.
// All amounts are USD. Update and rebuild when the partner changes offers.
export const site = {
  name: 'BJCRUM', origin: 'https://bjcrum.com', app: 'https://app.bjcrum.com/',
  docs: 'https://app.bjcrum.com/docs', support: 'fax@bjcrum.com',
};
export const plans = {
  solo: [
    { id: 'free', name: 'Free', credits: 60, price: 0, cadence: 'once' },
    { id: 'solo-200', name: 'Solo 200', credits: 200, price: 29, cadence: 'monthly' },
    { id: 'solo-515', name: 'Solo 515', credits: 515, price: 59, cadence: 'monthly' },
    { id: 'solo-1030', name: 'Solo 1030', credits: 1030, price: 119, cadence: 'monthly' },
  ],
  agency: [
    { id: 'agency-1100', name: 'Agency 1100', credits: 1100, price: 149, cadence: 'monthly' },
    { id: 'agency-2535', name: 'Agency 2535', credits: 2535, price: 299, cadence: 'monthly' },
    { id: 'agency-4455', name: 'Agency 4455', credits: 4455, price: 549, cadence: 'monthly' },
  ],
};
export const benefits = {
  solo: [
    'The full AI builder with live preview', 'Publish to a live URL, or your own custom domain',
    'BJCRUM Max, the deep agent, on every build', 'Code export and GitHub sync',
    '10 AI + 20 stock images per project', 'Version history and restore',
  ],
  agency: [
    'Everything in Solo', 'Invite clients to review and comment', 'Up to 15 team seats with roles',
    'Public, unlisted or private visibility', 'Android APK, Play Store and App Store kits',
    '25 AI + 50 stock images per project',
  ],
};
export function promptUrl(raw) {
  const prompt = String(raw ?? '').trim().slice(0, 2000);
  const url = new URL(site.app);
  if (prompt) url.searchParams.set('prompt', prompt);
  return url.href;
}
