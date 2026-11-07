// Curio seed content. ALL items are DEMO copy: written in Curio's own words, status "demo".
// Citations were written from memory and have NOT been verified against the originals (verified:false).
// Never present these as editorially verified until each source is checked.

export const SUBJECTS = [
  { id: 'econ',     name: 'Economics & finance',     short: 'Economics',  icon: 'chart',   hue: 42,  blurb: 'Money, markets and the incentives behind them.' },
  { id: 'history',  name: 'History & geopolitics',   short: 'History',    icon: 'column',  hue: 18,  blurb: 'How the past shaped the map and the rules.' },
  { id: 'science',  name: 'Science & technology',    short: 'Science',    icon: 'flask',   hue: 190, blurb: 'Discoveries, methods and the tools that followed.' },
  { id: 'mind',     name: 'Psychology & philosophy', short: 'Mind',       icon: 'brain',   hue: 280, blurb: 'How we think, and how we ought to.' },
  { id: 'art',      name: 'Art, cinema & literature',short: 'Art',        icon: 'film',    hue: 340, blurb: 'Craft, taste and the stories we keep telling.' },
  { id: 'random',   name: 'Random discoveries',      short: 'Random',     icon: 'spark',   hue: 55,  blurb: 'Odd, delightful and true.' },
  { id: 'politics', name: 'Politics & society',      short: 'Society',    icon: 'scales',  hue: 8,   blurb: 'Institutions, collective action and power.' },
  { id: 'business', name: 'Business & innovation',   short: 'Business',   icon: 'bulb',    hue: 150, blurb: 'Why firms exist, win and fail.' },
  { id: 'nature',   name: 'Nature & the universe',   short: 'Nature',     icon: 'orbit',   hue: 220, blurb: 'From forests to the edge of the sky.' },
  { id: 'maths',    name: 'Mathematics & statistics',short: 'Maths',      icon: 'sigma',   hue: 25,  blurb: 'Patterns, proofs and the traps in numbers.' }
];

const src = (title, author, year, note = '') => ({ title, author, year, note, verified: false });

export const IDEAS = [
  {
    id: 'lucas-critique', subjects: ['econ', 'politics'], title: 'The Lucas Critique',
    hook: 'Why economic policy can change the very behaviour that policymakers are trying to predict.',
    body: [
      'When a government or central bank changes its rules, people and firms do not stand still. They adjust their expectations and their decisions, and that can quietly break the statistical relationships policymakers were relying on.',
      'In 1976 the economist Robert Lucas argued that a model fitted to past data can mislead if the policy regime then changes, because the old patterns were themselves a product of the old rules.',
      'A classic target was the idea that governments could permanently buy lower unemployment with higher inflation. If people learn to expect inflation, the trade-off they relied on can vanish.'
    ],
    why: 'Forecasts should model how people respond to policy, not assume that yesterday\'s correlations will hold tomorrow.',
    caveat: 'The critique does not make every empirical model useless. It asks for expectations, policy regimes and behavioural responses to be modelled carefully.',
    sources: [src('Econometric policy evaluation: a critique', 'Robert E. Lucas Jr.', 1976, 'Carnegie-Rochester Conference Series on Public Policy, vol. 1')],
    quiz: { q: 'What is the core warning of the Lucas critique?', options: ['Models are always wrong', 'Relationships in past data can change when policy rules change', 'Inflation can never be controlled', 'Governments should never intervene'], answer: 1, explain: 'People adapt to new rules, so correlations observed under the old regime may not survive the change.' }
  },
  {
    id: 'goodharts-law', subjects: ['econ', 'business'], title: 'Goodhart\'s law',
    hook: 'When a measure becomes a target, it stops being a good measure.',
    body: [
      'Economist Charles Goodhart noticed in the 1970s that a statistical regularity tends to collapse once pressure is placed on it for control purposes. The popular wording, "when a measure becomes a target, it ceases to be a good measure", came later from the anthropologist Marilyn Strathern.',
      'The mechanism is simple. A number works as a signal because it usually tracks something we care about. Once people are rewarded for the number itself, they find cheaper ways to move it, and the link to the underlying goal weakens.',
      'Think of a hospital judged on waiting times that starts reclassifying patients, or a school judged on test scores that teaches only to the test.'
    ],
    why: 'Any scoreboard changes the game it was meant to observe. Good targets need to be hard to game, or paired with other checks.',
    caveat: 'Not every target backfires. The law describes a risk that grows with the stakes and with how easily the measure can be manipulated.',
    sources: [src('Problems of monetary management: the UK experience', 'Charles Goodhart', 1975), src('"Improving ratings": audit in the British university system', 'Marilyn Strathern', 1997, 'European Review')]
  },
  {
    id: 'westphalia', subjects: ['history', 'politics'], title: 'The Peace of Westphalia, and the myth built on it',
    hook: 'The 1648 treaties are said to have invented the modern state system. Historians are not so sure.',
    body: [
      'In 1648 the treaties of Osnabrück and Münster ended the Thirty Years\' War, a devastating conflict across much of central Europe. They settled disputes among the Holy Roman Empire, France, Sweden and others.',
      'A tidy story grew up later: that Westphalia created sovereign states, each supreme within its borders and free from outside interference. Textbooks of international relations still call this the Westphalian system.',
      'Closer reading shows the treaties mostly adjusted rights inside the Empire. Sovereignty as we mean it emerged gradually, over a long period, rather than being declared on one date.'
    ],
    why: 'It is a good example of how a convenient origin story can shape how we think about the present, even when the evidence is messier.',
    caveat: 'Scholars disagree about how much weight to give 1648. The safe claim is that it mattered, but not that it started the modern world.',
    sources: [src('Sovereignty, international relations, and the Westphalian myth', 'Andreas Osiander', 2001, 'International Organization 55(2)')]
  },
  {
    id: 'roman-debasement', subjects: ['history', 'econ'], title: 'How Rome quietly watered down its money',
    hook: 'An empire can pay its bills by shrinking the silver in its coins. It works, until it doesn\'t.',
    body: [
      'The Roman silver denarius started out as nearly pure silver. From the reign of Nero in the 1st century CE, emperors began mixing in more base metal, so each coin contained less silver while still being worth one denarius on paper.',
      'In the short run this let the state mint more coins from the same silver and pay soldiers and officials. Over the long run, as the silver share kept falling, prices rose and trust in the coin eroded.',
      'By the 3rd century the denarius was mostly base metal. The pattern is one of the earliest well-documented cases of a state financing itself by degrading its currency.'
    ],
    why: 'It is a physical version of a modern lesson: creating money is easy, but keeping it trusted is the hard part.',
    caveat: 'Historians debate how directly debasement caused Rome\'s wider troubles. It was one pressure among many, including war, plague and politics.',
    sources: []
  },
  {
    id: 'semmelweis', subjects: ['science'], title: 'Semmelweis and the handwashing that nobody wanted',
    hook: 'In 1847 a Viennese doctor found a simple way to save mothers\' lives and was largely ignored.',
    body: [
      'Ignaz Semmelweis worked in a Vienna maternity hospital with two clinics. Women in the clinic run by doctors died of childbed fever far more often than those in the clinic run by midwives.',
      'He noticed that the doctors also performed autopsies and then went straight to deliveries. He ordered handwashing with a chlorinated solution, and deaths in that clinic fell sharply.',
      'The medical establishment resisted. There was no germ theory yet, and the idea implied that doctors themselves were carrying death. Acceptance came only after his time, with the work of Pasteur and Lister.'
    ],
    why: 'A correct result can fail to spread if it lacks a mechanism people accept, or if it threatens a group\'s self-image.',
    caveat: 'The popular version is often dramatised. The core facts are well supported, but details of his later life are more contested.',
    sources: [src('Die Ätiologie, der Begriff und die Prophylaxis des Kindbettfiebers', 'Ignaz Semmelweis', 1861)],
    quiz: { q: 'Why was Semmelweis\'s finding resisted?', options: ['His data was clearly wrong', 'It lacked an accepted mechanism and implied doctors caused harm', 'Handwashing was already routine', 'The hospital refused to publish it'], answer: 1, explain: 'Germ theory had not yet been established, and his claim was an uncomfortable one for doctors.' }
  },
  {
    id: 'crispr', subjects: ['science', 'nature'], title: 'CRISPR began as a bacterial immune system',
    hook: 'The gene-editing tool that is reshaping biology was first an ancient defence against viruses.',
    body: [
      'Bacteria are attacked by viruses called phages. Some bacteria keep short snippets of a virus\'s DNA in a special region of their own genome, like a mugshot gallery.',
      'If the same virus returns, the bacterium uses those snippets to guide a protein, such as Cas9, to the matching DNA and cut it. That is the natural CRISPR system.',
      'In 2012 Jennifer Doudna, Emmanuelle Charpentier and colleagues showed it could be programmed to cut chosen DNA targets in a test tube. That turned a curiosity of microbiology into a general-purpose editing tool.'
    ],
    why: 'It shows how basic research on obscure organisms can become a transformative technology decades later.',
    caveat: 'Editing living organisms raises real safety and ethical questions, especially for changes that can be inherited.',
    sources: [src('A programmable dual-RNA-guided DNA endonuclease in adaptive bacterial immunity', 'Jinek et al.', 2012, 'Science 337')]
  },
  {
    id: 'dunning-kruger', subjects: ['mind'], title: 'The Dunning-Kruger effect, and its critics',
    hook: 'People who know least about a skill often judge themselves most generously. Or do they?',
    body: [
      'In 1999 David Dunning and Justin Kruger tested people on humour, logic and grammar. Those scoring lowest tended to rate their own ability far above their actual rank.',
      'Their explanation was a double burden: the skills needed to do a task well are the same skills needed to judge whether you did it well.',
      'Later researchers argued that part of the pattern can arise from statistics alone. Any noisy self-assessment, combined with the fact that people tend to rate themselves as above average, produces a similar-looking graph.'
    ],
    why: 'It is a useful reminder to be modest about unfamiliar fields, and equally modest about popular psychology claims.',
    caveat: 'The effect is often repeated online as "stupid people think they are smart". That is a gross oversimplification, and the size of the real effect is still debated.',
    sources: [src('Unskilled and unaware of it', 'Justin Kruger & David Dunning', 1999, 'Journal of Personality and Social Psychology 77(6)')],
    quiz: { q: 'What is one critique of the Dunning-Kruger result?', options: ['It was never published', 'Part of the pattern can arise from statistical artefacts', 'It only applies to children', 'It was disproven entirely'], answer: 1, explain: 'Noisy self-assessment and a general "better than average" tendency can recreate much of the pattern.' }
  },
  {
    id: 'veil-of-ignorance', subjects: ['mind', 'politics'], title: 'Rawls\'s veil of ignorance',
    hook: 'How would you design a society if you did not know where in it you would end up?',
    body: [
      'In A Theory of Justice (1971) the philosopher John Rawls proposed a thought experiment. Imagine choosing the basic rules of society from behind a veil: you do not know your wealth, talents, gender, background or even your values.',
      'Rawls argued that people in that position would choose fair rules, since any of them might land at the bottom. He thought they would insist on equal basic liberties and would permit inequalities only if they benefit the worst off.',
      'The point is not that the veil exists. It is a device for checking whether a rule is fair, by stripping out your own self-interest.'
    ],
    why: 'It gives a concrete test for fairness that can be applied to anything from tax systems to office policies.',
    caveat: 'Critics disagree about what people would really choose behind the veil, and whether abstracting from identity leaves out something important.',
    sources: [src('A Theory of Justice', 'John Rawls', 1971, 'Harvard University Press')]
  },
  {
    id: 'kuleshov', subjects: ['art'], title: 'The Kuleshov effect',
    hook: 'The same face, cut next to different images, seems to show different emotions.',
    body: [
      'In the 1910s and 20s the Soviet filmmaker Lev Kuleshov experimented with editing. According to the famous account, he intercut the same neutral shot of an actor with images such as a bowl of soup, a coffin and a child at play.',
      'Viewers are said to have praised the actor\'s subtle expression of hunger, grief or tenderness, even though the face never changed.',
      'The lesson for filmmakers is that meaning is built between shots. Editing is not just joining scenes; it is a way of making the audience supply the feeling.'
    ],
    why: 'It explains why a cut can carry more emotion than a close-up, and why context shapes how we read faces in everyday life.',
    caveat: 'The original footage is lost and accounts differ, so the exact experiment is uncertain. Later studies of the effect have also produced mixed results.',
    sources: []
  },
  {
    id: 'moby-dick', subjects: ['art'], title: 'Moby-Dick was a flop',
    hook: 'One of the most celebrated novels in English sold poorly and was nearly forgotten.',
    body: [
      'Herman Melville published Moby-Dick in 1851. Reviews were mixed, sales were modest, and Melville was never again a bestselling novelist. He later worked as a customs inspector in New York.',
      'He died in 1891 with the book largely out of favour. Its revival began in the early 20th century, around his centenary in 1919, as critics and readers rediscovered it as an ambitious, strange masterpiece.',
      'It is now commonly ranked among the greatest American novels, almost entirely thanks to later generations.'
    ],
    why: 'Taste is not fixed. Contemporary reception is a poor predictor of how a work will be judged later.',
    caveat: 'The precise sales figures and the size of the early backlash are often exaggerated in retellings.',
    sources: []
  },
  {
    id: 'emu-war', subjects: ['random', 'history'], title: 'The Great Emu War',
    hook: 'In 1932 the Australian military went to war with birds. The birds did well.',
    body: [
      'In Western Australia, thousands of emus moved into farmland after the First World War, trampling crops. Farmers, many of them veterans, asked the government for help.',
      'In late 1932 soldiers armed with machine guns were sent to cull the birds. The emus scattered in small groups and proved hard to hit, and the operation was widely mocked in the press.',
      'The campaign was wound down, and later efforts relied on bounties paid to farmers, which proved more effective.'
    ],
    why: 'A neat illustration of how a technology advantage can fail against a mobile, dispersed problem.',
    caveat: 'The "war" label is a nickname. It was a small, short operation, and the exact number of emus killed is disputed.',
    sources: []
  },
  {
    id: 'dancing-plague', subjects: ['random', 'mind'], title: 'The dancing plague of 1518',
    hook: 'In Strasbourg, dozens of people reportedly danced for days and could not stop.',
    body: [
      'In July 1518 a woman began dancing in a street in Strasbourg. Within days, dozens of others had joined her, and records suggest the number grew into the hundreds.',
      'Authorities, thinking it a medical problem, reportedly even hired musicians to keep people moving, a decision that probably made things worse.',
      'Historians propose explanations including mass psychogenic illness triggered by extreme stress during a period of famine and disease. The exact cause remains uncertain.'
    ],
    why: 'It shows how mind, culture and circumstance can produce physical symptoms that spread among a group.',
    caveat: 'The surviving records are limited, and claims about how many died are uncertain.',
    sources: []
  },
  {
    id: 'duvergers-law', subjects: ['politics', 'maths'], title: 'Duverger\'s law',
    hook: 'Why do some countries drift toward two big parties while others have many?',
    body: [
      'The French political scientist Maurice Duverger observed that systems where the candidate with the most votes in each district wins tend to produce two main parties.',
      'The logic is strategic. If a small party has little chance of winning a seat, voters fear wasting their vote and switch to whichever of the big parties they prefer less badly. Over time, small parties shrink.',
      'Proportional systems, where seats follow vote shares, lower that penalty and usually support more parties.'
    ],
    why: 'Electoral rules shape the political landscape as much as voters\' views do.',
    caveat: 'It is a tendency, not an iron law. Regional parties, strong local identities and other factors can keep a third party alive.',
    sources: [src('Les partis politiques', 'Maurice Duverger', 1951)]
  },
  {
    id: 'commons', subjects: ['politics', 'econ'], title: 'The tragedy of the commons, and Ostrom\'s reply',
    hook: 'A shared pasture seems doomed to overuse. Real communities often prove otherwise.',
    body: [
      'In 1968 ecologist Garrett Hardin described herders sharing a pasture. Each gains from adding one more animal, while the cost of overgrazing is shared by all, so each adds more until the pasture is ruined.',
      'The model captures a real problem in fisheries, groundwater and the climate. But Hardin implied only privatisation or state control could solve it.',
      'Elinor Ostrom studied actual communities, from Swiss alpine meadows to Japanese forests, and found many managed shared resources for centuries using clear boundaries, local rules, monitoring and graduated penalties. She won the Nobel prize in economics in 2009.'
    ],
    why: 'It shows that cooperation is neither guaranteed nor impossible; the design of the rules is what matters.',
    caveat: 'Ostrom\'s examples tend to be small and close-knit. Her design principles do not automatically scale to global problems.',
    sources: [src('The tragedy of the commons', 'Garrett Hardin', 1968, 'Science 162'), src('Governing the Commons', 'Elinor Ostrom', 1990, 'Cambridge University Press')]
  },
  {
    id: 'innovators-dilemma', subjects: ['business'], title: 'The innovator\'s dilemma',
    hook: 'Why do well-run companies, doing everything right, still get overtaken?',
    body: [
      'Clayton Christensen studied industries such as disk drives and found a pattern. Strong firms listen to their best customers and invest in better, pricier products.',
      'Meanwhile a simpler, cheaper product, initially worse by the standards of those customers, finds a new market. It improves steadily until it is good enough for the mainstream, and the incumbent finds it is too late.',
      'The dilemma is that following good management practice, such as serving your most profitable customers, is exactly what exposes you to the disruption.'
    ],
    why: 'It explains why success can make a firm blind to threats, and why startups can win from the edges.',
    caveat: 'Critics point out that "disruption" is used too loosely, and that some incumbents do adapt successfully.',
    sources: [src('The Innovator\'s Dilemma', 'Clayton M. Christensen', 1997, 'Harvard Business School Press')]
  },
  {
    id: 'coase-firm', subjects: ['business', 'econ'], title: 'Why firms exist at all',
    hook: 'If markets are efficient, why isn\'t everyone just a freelancer?',
    body: [
      'In 1937 Ronald Coase asked a question that sounds odd: inside a company, resources are directed by managers, not prices. Why do we have that at all?',
      'His answer was that using the market has costs: finding partners, negotiating terms, writing and enforcing contracts. When these transaction costs are high, it is cheaper to bring activity inside a single organisation.',
      'A firm should grow until the cost of organising one more activity internally equals the cost of buying it on the market.'
    ],
    why: 'It helps explain outsourcing, platform companies and why technology that lowers transaction costs can reshape what firms do.',
    caveat: 'The theory is a simplification. Real firms also exist for reasons such as control of knowledge, culture and bargaining power.',
    sources: [src('The Nature of the Firm', 'Ronald H. Coase', 1937, 'Economica')]
  },
  {
    id: 'dark-sky', subjects: ['nature'], title: 'Why the night sky is dark',
    hook: 'If stars fill an infinite universe, every line of sight should end on one. Why isn\'t the sky blazing?',
    body: [
      'This puzzle is called Olbers\' paradox. In an infinite, unchanging universe full of stars, any direction you look would eventually hit a star\'s surface, and the whole sky should glow as bright as a star.',
      'The resolution is that the universe is not infinite in age. Light from very distant stars has not had time to reach us, and the expansion of space stretches the light that does arrive, weakening it.',
      'So the dark night sky is a clue that the universe has a finite history.'
    ],
    why: 'One everyday observation, a dark sky at night, carries real information about cosmology.',
    caveat: 'Both the finite age and the cosmic expansion contribute; the popular explanation often credits only one.',
    sources: [],
    quiz: { q: 'What resolves Olbers\' paradox?', options: ['Stars are too small', 'Space is mostly cold', 'The universe has a finite age and is expanding', 'Dust blocks all distant stars'], answer: 2, explain: 'Distant light has not had time to arrive, and expansion dims what does.' }
  },
  {
    id: 'wood-wide-web', subjects: ['nature', 'science'], title: 'The "wood wide web" and what we really know',
    hook: 'Trees are said to share food and warnings through underground fungal networks. The evidence is more tangled.',
    body: [
      'Fungi called mycorrhizae connect with tree roots, trading minerals and water for sugars. Because fungi can link roots of different plants, a popular idea emerged that forests are connected through a "wood wide web".',
      'Some versions claim that "mother trees" nurture their seedlings and that trees send warning signals. Early experiments inspired these claims, and they spread widely in books and documentaries.',
      'Recent reviews have argued that the strongest claims go beyond the evidence. Fungal networks exist, but how much they benefit trees in natural forests is still unsettled.'
    ],
    why: 'It is a good case of an exciting story outrunning its evidence, and of science correcting itself.',
    caveat: 'This does not mean the networks are unimportant. It means some of the most popular claims are not yet proven.',
    sources: [src('Positive citation bias and overinterpreted results lead to misinformation on common mycorrhizal networks in forests', 'Karst, Jones & Hoeksema', 2023, 'Nature Ecology & Evolution')]
  },
  {
    id: 'arrow-theorem', subjects: ['maths', 'politics'], title: 'Arrow\'s impossibility theorem',
    hook: 'No voting system can satisfy every sensible rule at once.',
    body: [
      'Kenneth Arrow asked whether there is a way to combine many people\'s ranked preferences into one group ranking that is fair. He listed a few modest requirements, such as: if everyone prefers A to B, the group should too; and the outcome between A and B should not depend on how people rank some irrelevant option C.',
      'He then proved that, with three or more options, the only system satisfying all his conditions is a dictatorship, where one person\'s preferences always decide.',
      'In other words, every real voting method has to give something up.'
    ],
    why: 'It tells us not to search for a perfect voting system, but to choose which flaws we can live with.',
    caveat: 'The theorem applies to ranked systems and to its exact conditions. Other kinds of voting, such as scoring, behave differently, though they have their own problems.',
    sources: [src('Social Choice and Individual Values', 'Kenneth J. Arrow', 1951)],
    quiz: { q: 'What does Arrow\'s theorem say about ranked voting with 3 or more options?', options: ['A perfect system exists', 'Only majority voting works', 'No system meets all his fairness conditions without being a dictatorship', 'It always produces ties'], answer: 2, explain: 'Any ranked system must violate at least one of his reasonable-seeming conditions.' }
  },
  {
    id: 'simpson', subjects: ['maths', 'science'], title: 'Simpson\'s paradox',
    hook: 'A trend can appear in every group, then reverse when the groups are combined.',
    body: [
      'Imagine two treatments. Treatment A works better than B for mild cases, and also better for severe cases. Yet when you pool all patients, B appears to do better overall.',
      'This can happen when the groups are unevenly mixed. If A is mostly given to severe cases, which are harder to treat, its pooled results look worse even though it is better within each group.',
      'A well-known real example was a 1973 analysis of graduate admissions at Berkeley, where overall figures seemed to show bias against women, but within most departments the pattern was weaker or reversed.'
    ],
    why: 'Numbers do not speak for themselves. Whether to look at the combined or the split data depends on the story behind it.',
    caveat: 'The right answer depends on causal understanding, not just arithmetic. Sometimes the pooled figure is the right one.',
    sources: [src('Sex bias in graduate admissions: data from Berkeley', 'Bickel, Hammel & O\'Connell', 1975, 'Science 187')]
  },
  {
    id: 'hedonic-adaptation', subjects: ['mind'], title: 'Why good news fades',
    hook: 'We adapt to improvements faster than we expect, a pattern called the hedonic treadmill.',
    body: [
      'A famous 1978 study compared lottery winners, people who had suffered serious accidents, and a control group. It reported that the winners were not much happier than the others, and that the accident victims were less unhappy than most people would predict.',
      'The idea is that we adapt. A new house, car or job gives a lift that tends to fade as it becomes the new normal, while the baseline we compare against moves.',
      'It suggests that people overestimate how long both good and bad events will affect them.'
    ],
    why: 'It is a reason to spend on experiences and relationships that stay fresh, and to be kinder to our future selves when we imagine disaster.',
    caveat: 'Later work found adaptation is incomplete: some events, such as long-term unemployment or bereavement, can leave lasting effects. The original study was also small.',
    sources: [src('Lottery winners and accident victims: is happiness relative?', 'Brickman, Coates & Janoff-Bulman', 1978, 'Journal of Personality and Social Psychology 36(8)')]
  }
];
