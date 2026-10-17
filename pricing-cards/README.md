# Responsive SaaS Pricing Cards

Three pricing cards with a Monthly/Yearly billing switch, hover effects and badge ribbons. Plain HTML, CSS and JavaScript. No build step.

(Pingwell is a made-up product used for example content.)

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and plan content |
| `style.css` | Layout, hover transitions, ribbons, light/dark theme |
| `script.js` | Billing switch and price updates |

## How to run

**Simplest:** unzip, then double-click `index.html`.

**Local server:** open a terminal in the `pricing-cards` folder and run:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. With Node.js you can use `npx serve .` instead.

Fonts load from Google Fonts. Offline, the page falls back to system fonts.

## What to try

- Click the switch (or the Monthly / Yearly text) to change the billing cycle. Prices fade to the new value and the "Billed" line updates.
- Hover a card. It lifts with `transform: translateY(-8px)`, the shadow deepens, the border takes the accent color, and the ribbon drops slightly.
- Tab through the page. The switch and buttons show a focus ring, and a focused card lifts like a hovered one.
- Resize the window. Three columns become one column below 900px.
- Switch your system to dark mode. The theme follows it.

## How it works

**Hover effects (CSS only).** `.card` has a `transition` on `transform` and `box-shadow`. `.card:hover` changes both. Only `transform` and `opacity` are animated for movement, which keeps the animation smooth. On touch devices (`@media (hover: none)`) the lift is turned off, and `prefers-reduced-motion` disables it for people who ask for less motion.

**Billing toggle (JavaScript).** Each card stores both prices in data attributes:

```html
<article class="card" data-monthly="29" data-yearly="24" data-yearly-total="290">
```

`setCycle()` flips one boolean, updates `aria-checked` on the switch, then rewrites each price from those attributes. To change a price, edit the attributes and the starting text in the HTML.

**Switch semantics.** The control is a real `<button role="switch" aria-checked>`, so keyboard and screen reader users can operate it.

**Ribbons.** A `<span class="ribbon">` positioned at the top-right of the card. `clip-path: polygon(...)` cuts the notch in the bottom edge.

**Yearly price math.** Yearly price is 10 months of the monthly price (2 months free), shown per month: Starter 12 → 10, Pro 29 → 24, Scale 79 → 66. Totals are 120, 290 and 790.

## Make it your own

- Change colors in the `:root` variables at the top of `style.css`.
- Change plans, prices and features in `index.html`.
- Move the `featured` class to another card to highlight a different plan.
