"use client";

import { useState, type FormEvent } from "react";
import { carModels, cityOptions, cityLabels, getTomorrowDateString } from "@/lib/data";
import { Check, ChevronDown, Calendar, ArrowRight, ArrowLeft } from "./icons";

const fieldBase =
  "w-full rounded border border-border bg-white px-3 py-2.5 text-[13px] text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

export default function HeroForm() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  
  // Step 1 state
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [model, setModel] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNext = () => {
    if (!name || !mobile || !model) {
      alert("Please fill in all fields to continue.");
      return;
    }
    setStep(2);
  };

  if (submitted) {
    return (
      <div className="flex h-[340px] w-full max-w-[340px] flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-2xl">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-lg font-bold text-text">Booking received!</h3>
        <p className="mt-2 text-xs text-muted">We&apos;ll call shortly to confirm your preferred car, time and location.</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setName("");
            setMobile("");
            setModel("");
          }}
          className="mt-6 rounded border border-border px-4 py-2 text-xs font-semibold text-text transition-colors hover:bg-bg-2"
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[340px] rounded-lg bg-white p-6 shadow-2xl">
      <h3 className="font-display text-xl font-bold text-text">Book a Test Drive</h3>
      <p className="mt-1 text-xs text-muted">
        {step === 1 ? "Step 1 of 2: Tell us what you want to drive" : "Step 2 of 2: Pick a time and location"}
      </p>
      
      <form onSubmit={onSubmit} className="mt-5 overflow-hidden">
        <div 
          className="flex w-[200%] transition-transform duration-500 ease-in-out"
          style={{ transform: step === 1 ? "translateX(0)" : "translateX(-50%)" }}
        >
          {/* Step 1 */}
          <div className="w-1/2 shrink-0 flex flex-col gap-3 pr-4">
            <label className="block">
              <span className="sr-only">Your Name</span>
              <input 
                type="text" 
                required 
                placeholder="Your Name" 
                className={fieldBase}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="sr-only">Mobile Number</span>
              <input 
                type="tel" 
                required 
                pattern="[0-9]{10}" 
                placeholder="Mobile Number" 
                className={fieldBase}
                value={mobile}
                onChange={e => setMobile(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="sr-only">Select Car Model</span>
              <div className="relative">
                <select 
                  required 
                  className={`${fieldBase} appearance-none pr-8`}
                  value={model}
                  onChange={e => setModel(e.target.value)}
                >
                  <option value="" disabled className="text-faint">Select Car Model</option>
                  {carModels.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </label>
            <button
              type="button"
              onClick={handleNext}
              className="mt-2 group flex w-full items-center justify-center gap-2 rounded bg-brand py-3 text-[13px] font-semibold text-white transition-all hover:bg-brand-light active:scale-[0.98]"
            >
              Next
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-center text-[11px] text-faint">
              No obligation. Takes less than 30 seconds.
            </p>
          </div>

          {/* Step 2 */}
          <div className="w-1/2 shrink-0 flex flex-col gap-3 pl-4">
            <label className="block">
              <span className="sr-only">Select Location</span>
              <div className="relative">
                <select defaultValue="" required className={`${fieldBase} appearance-none pr-8`}>
                  <option value="" disabled className="text-faint">Select Location</option>
                  {cityOptions.map(c => <option key={c} value={c}>{cityLabels[c] ?? c}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </label>
            <label className="block">
              <span className="sr-only">Preferred Date</span>
              <div className="relative">
                <input type="date" required min={getTomorrowDateString()} className={`${fieldBase} pr-8`} />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </label>
            <label className="block">
              <span className="sr-only">Preferred Time</span>
              <div className="relative">
                <select defaultValue="" required className={`${fieldBase} appearance-none pr-8`}>
                  <option value="" disabled className="text-faint">Select Time</option>
                  <option value="Morning">Morning (9–12)</option>
                  <option value="Afternoon">Afternoon (12–4)</option>
                  <option value="Evening">Evening (4–8)</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </label>
            
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="group flex w-1/3 items-center justify-center rounded border border-border bg-bg-2 py-3 text-[13px] font-semibold text-text transition-colors hover:bg-bg-3"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                type="submit"
                className="flex w-2/3 items-center justify-center rounded bg-brand py-3 text-[13px] font-semibold text-white transition-all hover:bg-brand-light active:scale-[0.98]"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
