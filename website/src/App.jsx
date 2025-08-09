import React, { useRef, useState } from "react";

export default function ChatGPTDisguiseLanding() {
  const cartRef = useRef(null);
  const [cart, setCart] = useState({ items: [], total: 0 });

  const product = {
    id: "chatgpt-disguise-1",
    name: "ChatGPT Disguise - Personal License",
    description:
      "A lightweight tool that wraps and formats AI outputs to match your voice and style. Plug-and-play, privacy-focused, and developer-friendly.",
    price: 5.0,
  };

  const features = [
    {
      title: "Human-like output",
      blurb: "Transforms model responses into natural, human-friendly phrasing with tone controls.",
    },
    {
      title: "Privacy-first",
      blurb: "Works client-side or on-prem - keep your prompts and outputs private.",
    },
    {
      title: "Easy integration",
      blurb: "Install in minutes - SDKs for web, node, and serverless environments.",
    },
    {
      title: "Lightweight",
      blurb: "Minimal footprint - optimised for speed and low resource use.",
    },
  ];

  function addOneToCart() {
    const item = { ...product, qty: 1 };
    setCart({ items: [item], total: product.price });
    setTimeout(() => {
      cartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function clearCart() {
    setCart({ items: [], total: 0 });
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold">CD</div>
          <div>
            <div className="text-lg font-medium">ChatGPT Disguise</div>
            <div className="text-sm text-gray-600">Humanise AI - ship with confidence</div>
          </div>
        </div>
        <nav className="space-x-4 text-sm">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#pricing" className="hover:underline">Pricing</a>
          <button onClick={addOneToCart} className="ml-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm">Buy now - $5</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">Ship confidently with ChatGPT Disguise</h1>
            <p className="mt-4 text-gray-600 max-w-xl">Polish AI responses to your brand voice, protect privacy, and integrate in minutes. Ideal for teams, developers, and creators who want predictable, human-friendly outputs.</p>

            <div className="mt-8 flex items-center gap-4">
              <button onClick={addOneToCart} className="px-6 py-3 rounded-lg bg-indigo-600 text-white">Buy now - $5</button>
              <a href="#features" className="px-6 py-3 rounded-lg border border-gray-200 text-sm">See features</a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-medium">{f.title}</div>
                  <div className="mt-2 text-sm text-gray-600">{f.blurb}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-tr from-white to-gray-100 p-8 rounded-2xl shadow-lg">
            <div className="p-6 rounded-xl bg-white shadow-inner">
              <h3 className="text-lg font-medium">Quick demo - what you get</h3>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li>- Smart tone presets for formal, casual, and neutral voices</li>
                <li>- One-click SDK to wrap model outputs</li>
                <li>- Small bundle size for client usage</li>
              </ul>
              <div className="mt-6">
                <label className="block text-xs text-gray-500">Sample prompt</label>
                <div className="mt-2 bg-gray-50 p-3 rounded text-sm">"Write a short email to a client apologising for a delayed delivery."</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-16">
          <h2 className="text-2xl font-semibold">Features that matter</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">Built for product teams and creators - simple, auditable, and predictable.</p>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white p-6 rounded-lg shadow">
                <div className="text-lg font-medium">{f.title}</div>
                <div className="mt-2 text-sm text-gray-600">{f.blurb}</div>
                <div className="mt-4">
                  <button onClick={addOneToCart} className="px-4 py-2 rounded bg-indigo-600 text-white text-sm">Buy now - $5</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="mt-16">
          <h2 className="text-2xl font-semibold">Pricing</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-medium">ChatGPT Disguise - Personal</div>
                  <div className="text-sm text-gray-600">Single user - instant download</div>
                </div>
                <div className="text-2xl font-semibold">$5</div>
              </div>
              <div className="mt-4 text-gray-600">One-time purchase - includes basic presets and SDK access. For teams, contact sales for licensing.</div>
              <div className="mt-6">
                <button onClick={addOneToCart} className="px-5 py-3 rounded-lg bg-indigo-600 text-white">Buy now - $5</button>
              </div>
            </div>
            <aside className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600">Secure checkout powered by your payment provider.</div>
              <div className="mt-4 text-sm text-gray-600">Email receipt and download link delivered instantly after purchase.</div>
            </aside>
          </div>
        </section>

        <section ref={cartRef} className="mt-16 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-medium">Cart</h3>
          {cart.items.length === 0 ? (
            <div className="mt-4 text-gray-600">Your cart is empty. Click Buy now to add the product.</div>
          ) : (
            <div className="mt-4 flex flex-col gap-4">
              {cart.items.map((it) => (
                <div key={it.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-600">Qty {it.qty}</div>
                  </div>
                  <div className="text-sm">${(it.price * it.qty).toFixed(2)}</div>
                </div>
              ))}
              <div className="flex items-center justify-between mt-4 border-t pt-4">
                <div className="text-gray-600">Total</div>
                <div className="font-semibold">${cart.total.toFixed(2)}</div>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 rounded bg-green-600 text-white text-sm">Checkout</button>
                <button onClick={clearCart} className="px-4 py-2 rounded border text-sm">Clear</button>
              </div>
            </div>
          )}
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ChatGPT Disguise - All rights reserved
        </footer>
      </main>
    </div>
  );
}
