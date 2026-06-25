import React, { useState } from 'react';

const App: React.FC = () => {
  // State for form fields
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [age, setAge] = useState<string>('25');
  const [height, setHeight] = useState<string>('175');
  const [weight, setWeight] = useState<string>('70');
  const [activityType, setActivityType] = useState<string>('Running (Outdoor)');
  const [duration, setDuration] = useState<string>('45');
  const [intensity, setIntensity] = useState<'Low' | 'Mid' | 'High'>('Mid');
  const [fitnessScore, setFitnessScore] = useState<number>(7.5);
  const [heartRate, setHeartRate] = useState<string>('145');

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-background border-b border-border z-50">
        <div className="flex justify-between items-center h-14 px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
            <h1 className="font-heading text-xl font-bold text-primary">FitCalc Pro</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="material-symbols-outlined text-muted-foreground cursor-pointer active:opacity-80 p-1.5 hover:bg-surface-container rounded-full transition-colors text-xl">
              account_circle
            </button>
            <button className="material-symbols-outlined text-muted-foreground cursor-pointer active:opacity-80 p-1.5 hover:bg-surface-container rounded-full transition-colors text-xl">
              settings
            </button>
          </div>
        </div>
      </header>

      <main className="grow max-w-7xl mx-auto px-4 py-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column: Form Setup */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Personal Information */}
            <section className="p-4 rounded-lg bg-card/80 backdrop-blur-sm border border-border">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  person
                </span>
                <h2 className="font-heading text-headline-md font-semibold text-foreground">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-label-caps text-muted-foreground px-1">GENDER</label>
                  <div className="flex p-0.5 bg-surface-container rounded-md border border-border">
                    <button
                      className={`flex-1 py-1.5 font-sans text-body-md rounded-md transition-all ${
                        gender === 'Male'
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'text-muted-foreground hover:bg-surface-container'
                      }`}
                      onClick={() => setGender('Male')}
                      type="button"
                    >
                      Male
                    </button>
                    <button
                      className={`flex-1 py-1.5 font-sans text-body-md rounded-md transition-all ${
                        gender === 'Female'
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'text-muted-foreground hover:bg-surface-container'
                      }`}
                      onClick={() => setGender('Female')}
                      type="button"
                    >
                      Female
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-label-caps text-muted-foreground px-1">AGE (YEARS)</label>
                  <input
                    className="w-full bg-card border border-input rounded-md px-3 py-1.5 font-sans text-body-md focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    placeholder="25"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-label-caps text-muted-foreground px-1">HEIGHT (CM)</label>
                  <input
                    className="w-full bg-card border border-input rounded-md px-3 py-1.5 font-sans text-body-md focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    placeholder="175"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-label-caps text-muted-foreground px-1">WEIGHT (KG)</label>
                  <input
                    className="w-full bg-card border border-input rounded-md px-3 py-1.5 font-sans text-body-md focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    placeholder="70"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Activity Details */}
            <section className="p-4 rounded-lg bg-card/80 backdrop-blur-sm border border-border">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  fitness_center
                </span>
                <h2 className="font-heading text-headline-md font-semibold text-foreground">Activity Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="font-mono text-label-caps text-muted-foreground px-1">ACTIVITY TYPE</label>
                  <select
                    className="w-full bg-card border border-input rounded-md px-3 py-1.5 font-sans text-body-md focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all appearance-none cursor-pointer"
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                  >
                    <option>Running (Outdoor)</option>
                    <option>Cycling</option>
                    <option>Swimming</option>
                    <option>High-Intensity Interval Training (HIIT)</option>
                    <option>Weightlifting</option>
                    <option>Yoga</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-label-caps text-muted-foreground px-1">DURATION (MINUTES)</label>
                  <input
                    className="w-full bg-card border border-input rounded-md px-3 py-1.5 font-sans text-body-md focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    placeholder="45"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-label-caps text-muted-foreground px-1">INTENSITY</label>
                  <div className="flex gap-1.5">
                    {(['Low', 'Mid', 'High'] as const).map((level) => (
                      <button
                        key={level}
                        className={`flex-1 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${
                          intensity === level
                            ? 'border-2 border-primary bg-primary text-primary-foreground'
                            : 'border border-input hover:border-primary'
                        }`}
                        onClick={() => setIntensity(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Advanced Metrics */}
            <section className="p-4 rounded-lg bg-card/80 backdrop-blur-sm border border-border">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  analytics
                </span>
                <h2 className="font-heading text-headline-md font-semibold text-foreground">Advanced Metrics</h2>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-end px-1">
                    <label className="font-mono text-label-caps text-muted-foreground">FITNESS SCORE</label>
                    <span className="font-mono text-primary font-bold text-base">{fitnessScore}</span>
                  </div>
                  <input
                    className="w-full appearance-none bg-transparent cursor-pointer h-1.5 rounded-md [&::-webkit-slider-runnable-track]:bg-border [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm"
                    max="10"
                    min="1"
                    step="0.5"
                    type="range"
                    value={fitnessScore}
                    onChange={(e) => setFitnessScore(parseFloat(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground px-1">
                    <span>BEGINNER</span>
                    <span>ELITE</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-label-caps text-muted-foreground px-1">AVG HEART RATE (BPM)</label>
                  <div className="relative">
                    <input
                      className="w-full bg-card border border-input rounded-md px-3 py-1.5 font-sans text-body-md focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      placeholder="145"
                      type="number"
                      value={heartRate}
                      onChange={(e) => setHeartRate(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-muted-foreground text-xs">BPM</span>
                  </div>
                </div>
              </div>
            </section>

            <button className="w-full py-3 bg-primary text-primary-foreground font-bold font-heading text-headline-md rounded-lg shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group">
              Calculate Prediction
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                rocket_launch
              </span>
            </button>
          </div>

          {/* Right Column: Results & Visualization */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-20">
            <div className="rounded-lg overflow-hidden border border-border relative h-56 mb-2 shadow-md group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJlW3M-tIw2BW30VDMjfEU4fjLaPmp-32B5xxUqb3sJS0w2RbqcDibZBEgzk7xyls3STvFVOlZugVrLpS5-FbK64WvCT3nphDC4Q-xAd3ncOCx3iFx5tzgq-dSDarJ-6Tos-g2GJUjE4mCTv-hlT-GtNBGzwQFTGANcA9N1okrrm0wyTNsXMCFYRmQsiJLozSt6L2wy7Indsy9Tax3CfS14qWrWCgdVMUSgrCaCjYGFPtIgoNlkH4rR8HSs-Aaz5Cxg-kKKhl9iBg')",
                }}
              ></div>
              <div className="absolute inset-0 bg-linear-to-t from-foreground/80 to-transparent flex flex-col justify-end p-4">
                <div className="bg-primary/90 backdrop-blur-md px-2.5 py-0.5 rounded-full self-start mb-1.5">
                  <span className="font-mono text-primary-foreground text-[10px] font-bold">LIVE PERFORMANCE TRACKING</span>
                </div>
                <h3 className="text-white font-heading text-headline-md leading-tight">
                  Optimize your metabolic output.
                </h3>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 border border-border shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full pointer-events-none"></div>
              <label className="font-mono text-label-caps text-secondary mb-1.5 block">PREDICTED CALORIES BURNED</label>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="font-heading text-metric-xl font-extrabold text-foreground">450</span>
                <span className="font-heading text-headline-md text-muted-foreground opacity-60">kcal</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-surface-container rounded-md border-l-4 border-primary">
                  <p className="font-sans text-foreground italic text-sm">
                    "You're operating at elite efficiency today. Maintaining this intensity for another 15 minutes would push you into the top 5%."
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-label-caps text-muted-foreground">INTENSITY IMPACT</span>
                    <span className="font-mono text-label-caps text-primary font-bold">+12%</span>
                  </div>
                  <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[85%]"></div>
                  </div>
                  <div className="flex justify-between items-center pt-1.5">
                    <span className="font-mono text-label-caps text-muted-foreground">METABOLIC RATE</span>
                    <span className="font-mono text-label-caps text-secondary font-bold">OPTIMAL</span>
                  </div>
                  <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-[65%]"></div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-2 border-2 border-secondary text-secondary font-bold font-sans text-body-md rounded-md hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-center gap-2">
                Share Progress
                <span className="material-symbols-outlined text-lg">share</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container rounded-lg p-3 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-secondary text-xl mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                  water_drop
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">REC. WATER</span>
                <span className="font-heading text-base text-foreground">0.8 L</span>
              </div>
              <div className="bg-surface-container rounded-lg p-3 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-xl mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                  timer
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">RECOVERY</span>
                <span className="font-heading text-base text-foreground">12h</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto bg-surface-container border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 w-full max-w-7xl mx-auto gap-3">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="font-mono text-label-caps text-foreground">FITCALC PRO</span>
            <p className="font-sans text-body-md text-muted-foreground">© 2024 FitCalc Pro Performance Analytics</p>
          </div>
          <div className="flex gap-3">
            <a className="font-sans text-body-md text-muted-foreground hover:text-secondary transition-all duration-200" href="#">
              Privacy Policy
            </a>
            <a className="font-sans text-body-md text-muted-foreground hover:text-secondary transition-all duration-200" href="#">
              Terms of Service
            </a>
            <a className="font-sans text-body-md text-muted-foreground hover:text-secondary transition-all duration-200" href="#">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;