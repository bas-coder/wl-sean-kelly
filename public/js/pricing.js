import { site, plans, benefits } from './site-config.js';
const defaults = { solo: 'solo-515', agency: 'agency-2535' };
const number = new Intl.NumberFormat('en-US');
const escape = (text) => String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const grant = (plan) => `${number.format(plan.credits)} credits ${plan.cadence === 'once' ? 'once' : 'per month'}`;
const billing = (plan) => plan.price === 0 ? 'One-time starter credits · No card required' : 'Billed monthly · Cancel anytime';

export function pricingMarkup() {
  const free = plans.solo.find((tier) => tier.id === 'free');
  return `<div class="pricing-wrapper">
    <div class="section-intro"><h2>Simple, transparent pricing</h2>
      <p>Start free, then choose the credits and tools that fit your next project.</p></div>
    <div class="free-plan" data-free-offer><div><span class="plan-badge">Start free</span><h3>${free.credits} free credits, granted once.</h3><p>Bring your first idea to life. No card required.</p></div><a class="site-button secondary" href="${site.app}" aria-label="Get started with Free on BJCRUM">Get started <span aria-hidden="true">↗</span></a></div>
    <div class="pricing-grid">${Object.entries(plans).map(([family, offers]) => {
      const tiers = offers.filter((tier) => tier.price > 0);
      const selected = tiers.find((tier) => tier.id === defaults[family]);
      const title = family === 'solo' ? 'Solo' : 'Agency';
      return `<article class="pricing-card ${family}-card" data-plan-family="${family}" aria-labelledby="${family}-title">
        <div class="plan-heading"><h3 id="${family}-title">${title}</h3>${family === 'agency' ? '<span class="plan-badge">For teams</span>' : ''}</div>
        <p class="plan-description">${family === 'solo' ? 'One builder, your own workspace.' : 'Build with your team. Bring clients into the process.'}</p>
        <div class="plan-summary" aria-live="polite" aria-atomic="true">
          <div class="plan-price"><span data-price>$${selected.price}</span><span data-cadence>/month</span></div>
          <p data-billing>${billing(selected)}</p><p class="plan-credits" data-credits>${grant(selected)}</p>
        </div>
        <div class="tier-options" role="group" aria-label="${title} credit allowance">${tiers.map((tier) => `<button type="button" data-tier="${tier.id}" aria-label="${number.format(tier.credits)} credits for $${tier.price} per month" aria-pressed="${tier.id === selected.id}">${number.format(tier.credits)}</button>`).join('')}</div><p class="tier-caption">Credits per month</p>
        <ul class="plan-benefits">${benefits[family].map((line) => `<li>${escape(line)}</li>`).join('')}</ul>
        <a class="site-button ${family === 'solo' ? 'secondary' : 'primary'}" href="${site.app}" aria-label="Get started with ${title} on BJCRUM">Get started</a>
      </article>`;
    }).join('')}</div>
    <p class="pricing-note">All prices in USD. Choose your plan in BJCRUM after signing in.<br>Free includes 60 credits granted once. Paid plans renew monthly.</p>
  </div>`;
}
export function initPricing() {
  document.querySelectorAll('[data-plan-family]').forEach((card) => {
    card.addEventListener('click', (event) => {
      const button = event.target.closest('[data-tier]');
      if (!button) return;
      const plan = plans[card.dataset.planFamily].find((tier) => tier.id === button.dataset.tier);
      if (!plan) return;
      card.querySelectorAll('[data-tier]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      card.querySelector('[data-price]').textContent = `$${plan.price}`;
      card.querySelector('[data-cadence]').textContent = plan.price === 0 ? '' : '/month';
      card.querySelector('[data-billing]').textContent = billing(plan);
      card.querySelector('[data-credits]').textContent = grant(plan);
    });
  });
}
