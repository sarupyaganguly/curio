// Curio batch 2: macroeconomics, central banking, monetary policy, econometrics.
// DEMO copy in Curio's own words. Citations were written from memory and are NOT verified (verified:false).
const src = (title, author, year, note = '') => ({ title, author, year, note, verified: false });

export const BATCH2 = [
  {
    id: "taylor-rule", subjects: ["econ"], title: "The Taylor rule",
    hook: "A one-line formula that turned “what should interest rates be?” into something you can check.",
    body: [
      "In 1993 John Taylor noticed that the US Federal Reserve’s interest-rate decisions over the preceding years were close to a simple pattern. Raise the policy rate when inflation is above target, and raise it when output is above its sustainable level.",
      "In its original form, the rule sets the rate at roughly the inflation rate plus 2%, then adds half of any gap between inflation and a 2% goal, and half of the output gap. The key point is that the rate should rise by more than one-for-one with inflation, so the real interest rate goes up when inflation rises.",
      "Central banks do not follow it mechanically. But it became a benchmark that markets and policymakers use to ask whether policy is looser or tighter than usual."
    ],
    why: "It gave a clear, testable idea of what a systematic monetary policy looks like, and a way to judge it.",
    caveat: "The answer depends heavily on inputs that cannot be observed directly, such as the neutral interest rate and the output gap. Different reasonable estimates can give quite different prescriptions.",
    sources: [src("Discretion versus policy rules in practice", "John B. Taylor", 1993, "Carnegie-Rochester Conference Series on Public Policy 39")],
    quiz: { q: "Why must the policy rate rise by more than one-for-one with inflation in a Taylor-type rule?", options: ["So the real interest rate rises when inflation rises", "Because inflation is always temporary", "To keep the exchange rate fixed", "So the budget deficit falls"], answer: 0, explain: "If the nominal rate rises by more than inflation does, the real rate climbs, which cools demand and pushes inflation back down." }
  },
  {
    id: "r-star", subjects: ["econ"], title: "r-star: the interest rate nobody can see",
    hook: "Central banks aim at a “neutral” rate that neither heats nor cools the economy, but they can only estimate it.",
    body: [
      "r-star (r*) is the real interest rate that would be consistent with the economy running at capacity with stable inflation. If the policy rate, adjusted for inflation, is above it, policy is restrictive; below it, policy is stimulative.",
      "The problem is that r* is not observed. Economists such as Thomas Laubach and John Williams estimate it by using models that link output, inflation and interest rates over time. Their approach became widely followed, and the New York Fed publishes updated estimates.",
      "Many estimates fell during the 2010s toward very low levels, often linked to slower growth, ageing populations and high saving. After the pandemic and the rise in rates, there was an active debate about whether r* had moved up."
    ],
    why: "Whether a given policy rate is tight or loose depends on r*, so uncertainty about it translates directly into uncertainty about the stance of policy.",
    caveat: "Estimates are surrounded by wide uncertainty bands, and they can be revised when new data arrive. Treat any single number as a rough guide.",
    sources: [src("Measuring the natural rate of interest", "Thomas Laubach & John C. Williams", 2003, "Review of Economics and Statistics 85(4)")]
  },
  {
    id: "forward-guidance", subjects: ["econ"], title: "Forward guidance and the zero lower bound",
    hook: "When rates cannot go lower, central banks try to move them by changing what people expect.",
    body: [
      "A central bank’s main tool is a short-term interest rate, and it is hard to push that much below zero. After the 2008 crisis, major central banks found themselves at this “zero lower bound” while the economy still needed support.",
      "One response was forward guidance: telling markets how long rates are likely to stay low, or under what conditions they will rise. Because longer-term borrowing costs depend on expected future short rates, a credible promise to keep rates low for longer can reduce them today.",
      "Economists Gauti Eggertsson and Michael Woodford showed in 2003 that, at the lower bound, shaping expectations of future policy becomes a central part of what a central bank can do."
    ],
    why: "It shows that communication is itself a policy tool, not just an explanation after the fact.",
    caveat: "Guidance only works if people believe it. If conditions change and the bank reverses course, it can lose credibility, and economists debate how powerful the effect is in practice.",
    sources: [src("The zero bound on interest rates and optimal monetary policy", "Gauti Eggertsson & Michael Woodford", 2003, "Brookings Papers on Economic Activity")]
  },
  {
    id: "quantitative-easing", subjects: ["econ"], title: "Quantitative easing, explained",
    hook: "How a central bank can support the economy by buying bonds with money it creates.",
    body: [
      "In quantitative easing (QE), a central bank buys assets, usually government bonds, and pays for them by crediting commercial banks with new reserves. It does this when short-term rates are already near zero.",
      "Economists point to several channels. Buying bonds pushes their prices up and yields down, lowering borrowing costs. Investors who sold bonds may shift into other assets, raising their prices too. And large purchases can signal that the central bank intends to keep policy loose for a long time.",
      "The Bank of Japan used an early version in the 2000s. The Federal Reserve, the Bank of England and the European Central Bank used it at scale after 2008 and again during the pandemic."
    ],
    why: "QE changed what central banks are able to do, and it enlarged their balance sheets to levels previously unseen in peacetime.",
    caveat: "Estimates of how much QE helps growth and inflation vary widely, and it has side effects such as higher asset prices and large central bank holdings that are costly to unwind.",
    sources: [src("The new tools of monetary policy", "Ben S. Bernanke", 2020, "American Economic Review 110(4)")]
  },
  {
    id: "quantitative-tightening", subjects: ["econ"], title: "Quantitative tightening: shrinking the balance sheet",
    hook: "Reversing QE sounds simple. It has proved harder to do quietly.",
    body: [
      "Quantitative tightening (QT) is the process of reducing a central bank’s bond holdings. Most banks do this passively: when a bond matures, they do not buy a new one to replace it, so the balance sheet shrinks gradually. Active sales are rarer.",
      "As the central bank’s holdings fall, the reserves that banks keep with it fall too, and the private sector must absorb more bonds. The aim is to remove stimulus without disturbing markets.",
      "The challenge is knowing when reserves stop being plentiful. In September 2019, after an earlier period of balance-sheet reduction, short-term US funding rates spiked, which was read as a sign that reserves had become scarcer than expected."
    ],
    why: "It is the less glamorous half of the QE story, and it affects long-term yields, bank funding and financial stability.",
    caveat: "How strongly QT tightens financial conditions is uncertain, and central banks have changed the pace of runoff at various times. Check the latest announcements for current policy.",
    sources: []
  },
  {
    id: "pandemic-inflation", subjects: ["econ"], title: "What drove the post-pandemic inflation?",
    hook: "Supply shocks, demand, or a mix? The debate shaped how central banks reacted.",
    body: [
      "Inflation rose sharply in 2021 and 2022 across many countries. Early on, many policymakers described it as transitory, driven by supply-chain disruption, energy prices and the reopening of economies.",
      "Economists Ben Bernanke and Olivier Blanchard analysed US data and argued that, at first, supply shocks to energy, food and goods did most of the work. Later, a very tight labour market, with many job vacancies per unemployed person, became more important, and it fed into wages and prices.",
      "Others put more weight on large fiscal support and strong demand. The answer matters for policy: supply shocks may fade on their own, while excess demand needs tighter policy."
    ],
    why: "It is a live example of how diagnosing the cause of inflation determines what the right response looks like.",
    caveat: "Economists still disagree on how much each factor contributed, and the findings differ by country. Treat any simple story with caution.",
    sources: [src("What caused the US pandemic-era inflation?", "Ben S. Bernanke & Olivier Blanchard", 2023, "Working paper")]
  },
  {
    id: "beveridge-curve", subjects: ["econ"], title: "The Beveridge curve and the soft landing",
    hook: "Can job vacancies fall without unemployment rising? That was the question behind the 2023 soft-landing hope.",
    body: [
      "The Beveridge curve plots job vacancies against unemployment. Normally the relationship slopes downward: when there are plenty of vacancies, unemployment tends to be low, and when vacancies dry up, unemployment is high.",
      "In 2022 vacancies were extremely high while unemployment was low, placing the economy at the top-left of the chart. Central banks hoped to cool demand and bring vacancies down without causing a rise in unemployment, the so-called soft landing.",
      "Economists such as Olivier Blanchard, Alex Domash and Lawrence Summers warned that the historical pattern suggested that was hard to achieve. Yet vacancies fell substantially over the following period while unemployment stayed relatively low."
    ],
    why: "It is a simple chart that frames a central trade-off in fighting inflation, and a good example of an observed pattern that may shift over time.",
    caveat: "Vacancy data can be noisy and may reflect changes in how firms post jobs, so it is not clear how much of the shift reflects a change in the underlying relationship.",
    sources: [src("Bad news for the Fed from the Beveridge space", "Olivier Blanchard, Alex Domash & Lawrence H. Summers", 2022, "Peterson Institute for International Economics Policy Brief")]
  },
  {
    id: "anchored-expectations", subjects: ["econ"], title: "Anchored inflation expectations",
    hook: "Why a central bank’s most valuable asset may be that people believe its target.",
    body: [
      "Inflation expectations are what households, firms and investors think inflation will be in the future. They feed into wage bargaining, price setting and long-term interest rates.",
      "When expectations are anchored, they stay near the central bank’s target even when actual inflation temporarily moves away. A burst of energy-price inflation is then seen as a one-off rather than a new trend, which makes it far less likely to spread.",
      "The 1970s are a cautionary tale. As inflation stayed high, expectations rose, and getting inflation back down later required very high interest rates and a painful recession."
    ],
    why: "It explains why credibility matters, and why central banks watch survey and market measures of expectations so closely.",
    caveat: "Expectations are hard to measure. Surveys, market-based measures and the views of firms can disagree, and each has biases.",
    sources: []
  },
  {
    id: "time-inconsistency", subjects: ["econ", "politics"], title: "Time inconsistency and the conservative central banker",
    hook: "Why governments hand interest-rate decisions to an independent bank that is tougher on inflation than they are.",
    body: [
      "In 1977 Finn Kydland and Edward Prescott showed that a policy that looks best today may not be best to follow when the time comes. A government might promise low inflation to shape expectations, but once those expectations are set, it is tempted to surprise people with extra stimulus.",
      "Sensible people see this coming, so they expect higher inflation, and the economy ends up with higher inflation and no extra growth. The problem is a lack of credible commitment.",
      "In 1985 Kenneth Rogoff proposed one solution: appoint a central banker who dislikes inflation more than society does. That commitment can deliver lower inflation without a large loss in output."
    ],
    why: "It is one of the main intellectual arguments for central bank independence, and it applies to any promise that is tempting to break.",
    caveat: "The model is stylised, and real-world evidence on independence is mixed. Measures of independence differ, and inflation fell in many countries for reasons beyond central bank design.",
    sources: [src("Rules rather than discretion: the inconsistency of optimal plans", "Finn E. Kydland & Edward C. Prescott", 1977, "Journal of Political Economy 85(3)"), src("The optimal degree of commitment to an intermediate monetary target", "Kenneth Rogoff", 1985, "Quarterly Journal of Economics 100(4)")]
  },
  {
    id: "average-inflation-targeting", subjects: ["econ"], title: "Average inflation targeting",
    hook: "A short-lived idea at the Fed: make up for past misses instead of letting bygones be bygones.",
    body: [
      "Conventional inflation targeting is forward-looking. If inflation falls below 2%, the bank tries to bring it back to 2%, but does not try to make up for the shortfall.",
      "In August 2020 the Federal Reserve announced a framework it called flexible average inflation targeting. After a period of inflation below 2%, it would aim for inflation moderately above 2% for some time, so that the average was close to its goal. The motivation was a world of low interest rates, in which a bank has little room to cut when inflation is too low.",
      "Inflation then rose sharply in 2021, well before any shortfall could be made up, and the framework was criticised as poorly timed. The Fed completed a review in 2025 that, as I understand it, moved away from the explicit make-up language."
    ],
    why: "It shows that even the rules of the game can change, and that they are designed with the last problem in mind.",
    caveat: "Details of the 2025 revision are given from memory and should be checked against the Fed’s own statement before being relied on.",
    sources: []
  },
  {
    id: "flat-phillips-curve", subjects: ["econ"], title: "Is the Phillips curve flat?",
    hook: "Inflation barely moved in the Great Recession, and then barely rose in the 2010s expansion. What happened to the trade-off?",
    body: [
      "The Phillips curve links inflation to economic slack: when unemployment is low, inflation tends to be higher. For decades it was a core part of how central banks thought about inflation.",
      "After 2008 inflation did not fall as much as the curve predicted, and in the late 2010s it did not rise much as unemployment hit lows. A 2022 study by Jonathon Hazell, Juan Herreño, Emi Nakamura and Jón Steinsson used regional data across US states and found that the curve is quite flat, and has been since the 1980s, with stable inflation expectations playing a large part.",
      "The surge in inflation after 2021 reopened the question. Some economists argue the relationship is non-linear: flat when the labour market is slack, but steeper when it is very tight."
    ],
    why: "If the curve is flat, inflation is not very sensitive to slack in normal times, which changes how much unemployment it takes to bring inflation down.",
    caveat: "Estimating the slope is difficult, because central banks react to inflation and the evidence is sensitive to the data and methods used.",
    sources: [src("The slope of the Phillips curve: evidence from U.S. states", "Hazell, Herreño, Nakamura & Steinsson", 2022, "Quarterly Journal of Economics 137(3)"), src("It’s baaack: the surge in inflation in the 2020s and the return of the non-linear Phillips curve", "Pierpaolo Benigno & Gauti Eggertsson", 2023, "NBER working paper")]
  },
  {
    id: "fiscal-theory", subjects: ["econ", "politics"], title: "The fiscal theory of the price level",
    hook: "What if inflation depends on government debt, not only on the central bank?",
    body: [
      "In standard thinking, the central bank controls inflation through interest rates and the government’s budget is a separate matter. The fiscal theory turns this around, treating the price level as what makes the real value of government debt match the expected future surpluses that will pay for it.",
      "If people do not expect the government to run enough surpluses to repay its debt, the value of that debt must fall in real terms, and the price level has to rise. In this view, a large, unfunded fiscal expansion can be inflationary even when the central bank behaves sensibly.",
      "Earlier work by Thomas Sargent and Neil Wallace in 1981 made a related point, that tight money today can mean more inflation later if deficits are not addressed. John Cochrane’s 2023 book is a full treatment of the theory."
    ],
    why: "It became more relevant after pandemic-era deficits and higher debt-servicing costs, and it links monetary and fiscal policy.",
    caveat: "The theory is controversial and is not the basis of most central bank models. It is also hard to test, because the key quantity is the market’s expectation of future surpluses.",
    sources: [src("The Fiscal Theory of the Price Level", "John H. Cochrane", 2023, "Princeton University Press"), src("Some unpleasant monetarist arithmetic", "Thomas J. Sargent & Neil Wallace", 1981, "Federal Reserve Bank of Minneapolis Quarterly Review 5(3)")]
  },
  {
    id: "hank-models", subjects: ["econ"], title: "HANK: when households are not all the same",
    hook: "A new generation of macro models gives up the “representative household” and gets different answers about interest rates.",
    body: [
      "Classic macro models often assume a single, representative household that smooths its spending over time. In such models, a rate cut works mainly because people shift spending from the future to today.",
      "In reality, households differ a lot. Some hold wealth, some hold debt, and many live close to the edge of their budgets. HANK models (heterogeneous agent New Keynesian) include this variety. In a 2018 paper, Greg Kaplan, Benjamin Moll and Gianluca Violante found that the direct effect of interest rates on spending is small.",
      "Instead, most of the effect operates indirectly: lower rates raise demand, which raises jobs and incomes, and households with little savings spend that extra income quickly. That makes monetary policy’s effect depend on who gains and who loses."
    ],
    why: "It links inequality to the transmission of monetary policy, which standard models mostly could not do.",
    caveat: "These models are more complex and depend on assumptions about how many households are constrained and how they react. Results differ across versions.",
    sources: [src("Monetary policy according to HANK", "Greg Kaplan, Benjamin Moll & Giovanni L. Violante", 2018, "American Economic Review 108(3)")]
  },
  {
    id: "local-projections", subjects: ["econ", "maths"], title: "Local projections vs VARs",
    hook: "Two ways to draw the path of an economy after a shock, and a surprising result that they agree.",
    body: [
      "Economists often want an impulse response: how do output and inflation move over the following months after a shock, such as an unexpected rate rise?",
      "The traditional tool is the vector autoregression (VAR), which models how all variables depend on their past values and then traces the effect forward. In 2005 Òscar Jordà proposed local projections, in which a separate simple regression is run for each horizon, such as one month, six months and two years ahead.",
      "Local projections make fewer assumptions about the structure of the economy, so they are more flexible, though noisier. More recent work by Mikkel Plagborg-Møller and Christian Wolf showed that the two approaches estimate the same underlying impulse responses in a precise sense."
    ],
    why: "It shows how a modelling choice affects what we conclude about policy, and that apparent methodological rivalries can have a hidden common core.",
    caveat: "In small samples the methods can differ in bias and variance, and which one is better depends on the question and data.",
    sources: [src("Estimation and inference of impulse responses by local projections", "Òscar Jordà", 2005, "American Economic Review 95(1)"), src("Local projections and VARs estimate the same impulse responses", "Plagborg-Møller & Wolf", 2021, "Econometrica 89(2)")]
  },
  {
    id: "monetary-shocks", subjects: ["econ", "maths"], title: "How do you measure a central bank’s surprise?",
    hook: "To learn what rate changes do, you first need rate changes that are not just responses to the economy.",
    body: [
      "Central banks raise rates because the economy is strong, so simply comparing rate changes with later growth is misleading. What economists need is a monetary policy shock: a change that was not a predictable reaction to economic conditions.",
      "Christina and David Romer built one in 2004 by using the Fed’s own internal forecasts to strip out the part of each rate change that was a reaction to expected conditions, leaving the unexplained part.",
      "A second approach looks at markets. By measuring how yields and prices move in a narrow window around a policy announcement, researchers capture the surprise compared with what markets expected. Gürkaynak, Sack and Swanson refined this, and later work by Emi Nakamura and Jón Steinsson highlighted a complication: markets may also read an announcement as news about the economy."
    ],
    why: "Almost everything we believe about how monetary policy affects the economy depends on these identification choices.",
    caveat: "No measure is perfect. The Romer approach depends on the Fed’s internal forecasts being available, and the high-frequency approach has to disentangle the policy surprise from information about the outlook.",
    sources: [src("A new measure of monetary shocks: derivation and implications", "Christina D. Romer & David H. Romer", 2004, "American Economic Review 94(4)"), src("Do actions speak louder than words?", "Gürkaynak, Sack & Swanson", 2005, "International Journal of Central Banking 1(1)"), src("High-frequency identification of monetary non-neutrality: the information effect", "Emi Nakamura & Jón Steinsson", 2018, "Quarterly Journal of Economics 133(3)")]
  },
  {
    id: "staggered-did", subjects: ["econ", "maths"], title: "The difference-in-differences revolution",
    hook: "A workhorse method for evaluating policy turned out to hide a trap when treatment starts at different times.",
    body: [
      "Difference-in-differences compares how an outcome changes in places that adopt a policy with how it changes in places that do not. The idea is that, without the policy, both groups would have followed parallel trends.",
      "For years, researchers extended this to many places adopting at different dates, using a standard regression with fixed effects. Work by Andrew Goodman-Bacon and by Brantly Callaway and Pedro Sant’Anna showed a problem: the regression implicitly uses places that already adopted the policy as controls for later adopters.",
      "If effects grow or fade over time, those comparisons are contaminated and can even get the sign wrong. New estimators avoid this by comparing each group only with places that have not yet been treated."
    ],
    why: "It affects how many policy studies, from minimum wages to banking deregulation, should be interpreted, and shows how widely used methods can be quietly flawed.",
    caveat: "The newer methods still need the parallel-trends assumption, which can be hard to verify, and they can be less precise.",
    sources: [src("Difference-in-differences with variation in treatment timing", "Andrew Goodman-Bacon", 2021, "Journal of Econometrics 225(2)"), src("Difference-in-differences with multiple time periods", "Brantly Callaway & Pedro H. C. Sant’Anna", 2021, "Journal of Econometrics 225(2)")]
  },
  {
    id: "nowcasting", subjects: ["econ", "maths"], title: "Nowcasting: forecasting the present",
    hook: "Official GDP arrives weeks after the quarter ends, so economists estimate it while it is happening.",
    body: [
      "Gross domestic product is published with a lag, and policymakers must decide before they know how the economy has just performed. Nowcasting uses data that arrive earlier, such as jobs, retail sales, surveys and industrial output, to estimate the current quarter’s growth.",
      "A well-known approach by Domenico Giannone, Lucrezia Reichlin and David Small in 2008 used statistical factor models that summarise many indicators, and updated the estimate each time a new data release arrived. Public versions include the Atlanta Fed’s GDPNow and the New York Fed’s Staff Nowcast.",
      "As more data accumulate through a quarter, the nowcast usually becomes more accurate, and one can watch it change with each release."
    ],
    why: "It turns the stream of data into a running estimate of the economy, and it shows how forecasting depends on the timing of information.",
    caveat: "Nowcasts can be volatile early in a quarter, and they struggle with unusual shocks, as models trained on normal times did when the pandemic hit.",
    sources: [src("Nowcasting: the real-time informational content of macroeconomic data", "Giannone, Reichlin & Small", 2008, "Journal of Monetary Economics 55(4)")]
  },
  {
    id: "data-revisions", subjects: ["econ"], title: "The economy as first reported is not the economy",
    hook: "Policymakers decide using numbers that are later revised, sometimes by a lot.",
    body: [
      "Statistical agencies publish early estimates of GDP, employment and inflation, then revise them as more complete information arrives. Some revisions are large enough to change the story.",
      "In 2001 Athanasios Orphanides showed that policy rules estimated using today’s revised data can give a misleading picture of what central bankers saw at the time. He argued that, in the 1970s, officials relied on estimates of how far the economy was below potential that were too optimistic, which contributed to policy that was too loose.",
      "Dean Croushore and Tom Stark built a real-time data set so that researchers could study the data policymakers actually had, not only the final versions."
    ],
    why: "It is a reminder to judge past decisions by the information available then, and to hold today’s data with some humility.",
    caveat: "How much of the 1970s inflation is explained by mismeasurement is still debated, alongside oil shocks and changes in policy priorities.",
    sources: [src("Monetary policy rules based on real-time data", "Athanasios Orphanides", 2001, "American Economic Review 91(4)"), src("A real-time data set for macroeconomists", "Dean Croushore & Tom Stark", 2001, "Journal of Econometrics 105(1)")]
  },
  {
    id: "yield-curve-inversion", subjects: ["econ"], title: "Why an inverted yield curve worries economists",
    hook: "When short-term interest rates exceed long-term ones, recessions have often followed. The reason is more subtle than superstition.",
    body: [
      "Normally lenders demand more for tying up money for longer, so long-term yields are above short-term ones. An inverted curve means the opposite: the market is pricing short-term rates above long-term rates.",
      "One reading is that markets expect the central bank to cut rates in the future because the economy will weaken. Another is that high short-term rates, set by the central bank, squeeze bank lending, which relies on borrowing short and lending long.",
      "In 1998 Arturo Estrella and Frederic Mishkin found that the slope of the curve was one of the best predictors of US recessions about a year ahead. The curve inverted in 2022, but a recession did not follow quickly, and the long delay has been widely discussed."
    ],
    why: "It is a rare case in which a single market signal has been a useful guide, and it shows how expectations of policy show up in prices.",
    caveat: "It is a statistical regularity based on only a handful of recessions, so there is no guarantee that it will repeat, and the timing varies a lot.",
    sources: [src("Predicting U.S. recessions: financial variables as leading indicators", "Arturo Estrella & Frederic S. Mishkin", 1998, "Review of Economics and Statistics 80(1)")]
  },
  {
    id: "sahm-rule", subjects: ["econ"], title: "The Sahm rule",
    hook: "A simple unemployment trigger that has flagged recessions, and what happened when it fired in 2024.",
    body: [
      "Economist Claudia Sahm proposed a rule in 2019 for when to deliver automatic fiscal support in a downturn. It signals a recession when the three-month average of the unemployment rate rises half a percentage point or more above its lowest level of the previous twelve months.",
      "The logic is that unemployment tends to rise slowly at first and then accelerate once a downturn is underway, so an early sustained increase tends to be a reliable warning.",
      "The rule triggered in August 2024, based on July data, and caused a brief market scare. No recession was declared, and Sahm herself suggested the signal might be distorted by unusual changes in labour supply, including immigration."
    ],
    why: "It shows how a simple, transparent indicator can be useful, and how its interpretation depends on why the underlying data moved.",
    caveat: "It is a rule of thumb, not a law, and has a short history of triggers. The 2024 episode illustrates that it can fire when the economy is not in recession.",
    sources: []
  }
];
