// Use a plain relative path for the schedule CSV.
const CSV_URL = 'data/schedule.csv';
let currentLang = "en";
let scheduleData = [];
let days = [];

// initialize flag
let _scheduleInitialized = false;
let _scheduleObserverAttached = false;
const speakers = [
    {
      category: "keynote",
      tabTitle: "Hee-Kap Ahn",
      name: "Hee-Kap Ahn / 안희갑 / 安熙甲",
      title: "Professor",
      affiliation: "Pohang University of Science and Technology (POSTECH)",
      email: "heekap@postech.ac.kr",
      photo: "images/speakers/heekap.png",
      type: "Keynote Speaker",  
      expertise: "Algorithms and Data structures / AI Algorithms and Machine Learning / Optimization / Computational Geometry",
      talkTitle: "Voronoi Diagrams in the Presence of Obstacles",
      abstract: `A Voronoi diagram is a fundamental geometric structure that partitions a space into regions according to the nearest site under a chosen distance measure. Owing to its rich structural and combinatorial properties, Voronoi diagrams have found broad applications in geometry, computer science, robotics and motion planning, biological modeling, and architecture. In this talk, we first review the basic definitions and key properties of Voronoi diagrams. We then introduce distance models in environments with obstacles (e.g., shortest-path/geodesic distances) and survey representative approaches for computing Voronoi diagrams in such settings—highlighting algorithmic ideas, typical challenges, and recent research progress, including both exact and approximation methods.`
    },
    {
      category: "keynote",
      tabTitle: "Kazuhisa Makino",
      name: "Kazuhisa Makino / 牧野 和久",
      title: "Professor",
      affiliation: "Kyto University",
      email: "add @kurims.kyoto-u.ac.jp",
      photo: "images/speakers/makino.jpg",
      type: "Keynote Speaker",
      expertise: "Discrete mathematics / Optimization / Algorithm theory",
      talkTitle: "Primal and Dual Representations",
      abstract: "Enumeration is one of the fundamental topics in discrete mathematics. From a complexity-theoretic perspective, three major open problems in enumeration remain unresolved: the vertex enumeration problem for polytopes, the monotone dualization problem for Boolean functions, and the Horn transformation problem. All of these problems are closely related to decision problems concerning primal and dual representations. In this talk, we provide an overview of their current status."
    },
    {
      category: "others",
      tabTitle: "Michelle Döring",
      name: "Michelle Döring",
      title: "PhD Student",
      affiliation: "Hasso Plattner Institute.",
      email: "michelle.doering@hpi.de ",
      photo: "images/speakers/csm_michelle_doering_ce43ac8db1.jpg",
      type: "Invited Speaker",
      expertise: "Temporal Graphs / Time-Varying Dynamic Networks",
      talkTitle: "Reachability-Preserving Isomorphisms in Temporal Graphs",
      abstract: `Temporal graphs model networks in which edges appear only at specific points in time. While many classical graph-theoretic notions admit natural temporal counterparts, the added time dimension changes their behavior in subtle and often surprising ways. A fundamental example is temporal reachability, which in contrast to static graphs is generally not transitive.

In this talk, I will first introduce temporal graphs and discuss some of their basic concepts and structural properties. I will then point to several areas in theoretical computer science and math where temporal graphs have proven useful, both as a technical tool and as a framework in its own right.

The second part of the talk is concerned with the question of when two temporal graphs can be considered equivalent. I will present several notions of isomorphisms, and compare temporal graph classes under those. This will highlight how the different isomorphism types lead to a structural perspective on temporal graphs and help identify which temporal features are essential for the reachability patterns they realize.`
    },
    {
      category: "plenary",
      tabTitle: "Michael Zlatin",
      name: "Michael Zlatin",
      title: " Assistant Professor",
      affiliation: " Pomona College.",
      email: "michael.zlatin@pomona.edu",
      photo: "images/speakers/mik_pic.png",
      type: "Invited Speaker",
      expertise: "Approximation Algorithms / Online Submodular Assignment",
      talkTitle: "Algorithmic Matroid Intersection Coloring",
      abstract: `Algorithms for optimization problems over matroids are arguably one of the most generally applicable tools in the combinatorial optimizer's toolkit. One such example is the Matroid Intersection Coloring problem, in which we seek to color a set of elements with the fewest number of colors so that the color classes are independent in one or more matroids. In 1968, Jack Edmonds completely resolved the single matroid case, giving a polynomial-time algorithm to construct an optimal coloring. Since then, there has been a rich literature analysing the chromatic number of these structures, often leveraging non-constructive tools such as topological Hall's theorem and Sperner's Lemma. Yet, a fundamental gap persists between existential bounds and constructive results which would enable us to actually compute such colorings. 

In this talk I will survey exciting recent progress in this area. I will present findings from two recent papers in which we design new approximation algorithms for Matroid Intersection Coloring, as well as discuss applications to the famous Rota's Basis Conjecture. Based on joint work with Stephen Ardnt, Ben Moseley, Kirk Pruhs and Chaitanya Swamy, `
    },
    {
      category: "plenary",
      tabTitle: "Shang-En Huang",
      name: "Shang-En Huang / 黃上恩",
      title: "Assistant Professor",
      affiliation: "National Taiwan University",
      email: "	sehuang@csie.ntu.edu.tw",
      photo: "images/speakers/照片-黃上恩-1.jpg",
      type: "Invited Speaker",
      expertise: "Dynamic Graph Data Structures and Algorithms / Distributed Graph Algorithms",
      abstract: ""
    },
    {
      category: "plenary",
      tabTitle: "William Umboh",
      name: "William Umboh",
      title: "Assistant Professor",
      affiliation: "The University of Melbourne",
      email: "",
      photo: "images/speakers/profilepic-cropped.jpg",
      type: "Invited Speaker",
      expertise: "Approximation & Online Algorithms for Combinatorial Optimization",
      abstract: ""
    },
    {
      category: "plenary",
      tabTitle: "Evangelos Kipouridis",
      name: "Evangelos Kipouridis",
      title: "Researcher (Assistant Professor)",
      affiliation: "Max-Planck Institute",
      email: "",
      photo: "images/speakers/csm_kipouridis_a4cf8cf0de.jpg",
      type: "Invited Speaker",
      expertise: "(Hierarchical) Clustering / Graph Connectivity / Approximation Algorithms",
      talkTitle: "Hierarchical clustering: Approximation and beyond",
      abstract: `The algorithmic task of constructing hierarchical representations of data has been studied by various communities over many decades. Their applications range from statistics and databases to the analysis of complex networks and, more recently, machine learning, where they have proven useful for understanding text, images, graphs and multi-relational data. The reason why hierarchical representations are so ubiquitous is that many data sets stemming from nature or society are organized according to a latent hierarchy. Furthermore, in contrast to "flat" clustering techniques, like k-means or k-median which cannot capture fine-grained relationships among points, hierarchical clustering reveals the structure of a data set at multiple levels of granularity simultaneously.

Despite of the plethora of applications, the theory behind hierarchical clustering is underdeveloped, and popular heuristics offer little formal guarantees. In this talk I will present my work on algorithms with near optimal quality guarantees; in fact, in certain cases the algorithms run in near linear time, bridging the gap between theory and practice. Finally, I will discuss how to incorporate domain specific knowledge, leading to semi-supervised hierarchical clustering, as opposed to the traditional view of hierarchical clustering as an unsupervised learning method.`
    },
    {
      category: "others",
      tabTitle: "Changyeol Lee",
      name: "Changyeol Lee",
      title: " PhD Student",
      affiliation: "Yonsei University.",
      email: "changyeollee@yonsei.ac.kr ",
      photo: "images/speakers/me.jpg",
      type: "Invited Speaker",
      expertise: "Approximation Algorithms / Online Algorithms / Learning-augmented Algorithms / Combinatorial Optimization",
      talkTitle: "Handling LP-Rounding for Hierarchical Clustering and Fitting Distances by Ultrametrics",
      abstract: `We consider the classic correlation clustering problem in the hierarchical setting. Given a complete graph G=(V,E) and ℓ layers of input information, where the input of each layer consists of a nonnegative weight and a labeling of the edges with either + or -, this problem seeks to compute for each layer a partition of V such that the partition for any non-top layer subdivides the partition in the upper-layer and the weighted number of disagreements over the layers is minimized.

Hierarchical correlation clustering is a natural formulation of the classic problem of fitting distances by ultrametrics, which is further known as numerical taxonomy in the literature. While single-layer correlation clustering received wide attention since it was introduced and major progress evolved in the past three years, few is known for this problem in the hierarchical setting. The lack of understanding and adequate tools is reflected in the large approximation ratio known for this problem originating from 2021.

In this work we make both conceptual and technical contributions towards the hierarchical clustering problem. We present a simple paradigm that greatly facilitates LP-rounding in hierarchical clustering, illustrated with an algorithm providing a significantly improved approximation guarantee of 25.7846 for the hierarchical correlation clustering problem.

Our techniques reveal surprising new properties of the formulation presented and subsequently used in previous works for hierarchical clustering over the past two decades. This provides an interpretation on the core problem in hierarchical clustering as the problem of finding cuts with prescribed properties regarding average distances.

We further illustrate this perspective by showing that a direct application of the techniques gives a simple alternative to the state-of-the-art result for the ultrametric violation distance problem.
`
    },
    {
      category: "others",
      tabTitle: "Rin Saito",
      name: "Rin Saito",
      title: " PhD Student",
      affiliation: "Tohoku University.",
      email: "rin.saito@dc.tohoku.ac.jp",
      photo: "images/speakers/fix.jpg",
      type: "Invited Speaker",
      expertise: "Graph Algorithms / Parameterized Complexity / Combinatorial Reconfiguration",
      talkTitle: "Graph Algorithmic Developments in Combinatorial Reconfiguration",
      abstract: `While many algorithmic studies often focus on finding a single feasible solution, combinatorial reconfiguration explores the underlying structure of the entire solution space. It investigates whether one solution can be transformed into another through a sequence of small valid changes. In this talk, I will provide an overview of the fundamental concepts and results in this rapidly evolving field. I will then present our recent algorithmic findings, specifically focusing on the reconfiguration of vertex colorings (ISAAC 2025) and edge-disjoint spanning trees (ISAAC 2024). Finally, I will discuss other recent advances and outline future research directions.`
    },
    {
      category: "plenary",
      tabTitle: "Mario Günzel",
      name: "Mario Günzel",
      title: "Postdoctoral Researcher",
      affiliation: "Max-Planck Institute.",
      email: "",
      photo: "images/speakers/csm_profile_guenzel_4f59db872a.webp",
      type: "Invited Speaker",
      expertise: "Real-Time System Scheduling / Embedded Systems / Schedulability Tests / Scheduling Algorithms",
      talkTitle: `The Shape of Time:       
Analyzing End-to-End Latency Curves in Cyber-Physical Systems`,
      abstract: `In safety-critical cyber-physical systems (such as autonomous driving pipelines) functionalities are often organized into so-called cause-effect chains. That is, a sequence of periodically activated tasks pass data from sensing to actuation. One fundamental question is: Given an external stimulus at time $t$, then how long does it take to react to that stimulus? In the literature, this timing behavior is formalized as *Reaction Time* $RT(t)$. 

In this talk, the mathematical structure of this function under the well-established Logical Execution Time (LET) communication model is studied. One main observation is that $RT$ is piece-wise linear decreasing with jumps up in-between, giving the function a sawtooth-like shape. We demonstrate that it is possible to fully characterize $RT$ by an often times very small set of *anchor points* (i.e., the local maxima). Afterwards, we study how to derive these anchor points efficiently using *partitioned job chains*, which are built traversing the task graph from an intermediate task in both a forward and a backward manner. 

The payoff of having the full shape is that this allows analyzing a rich portfolio of timing metrics directly from the anchor points: minimum, maximum, and average reaction time, throughput, weakly-hard constraints and longest consecutive exceedance intervals. For most of these metrics, this is the first analysis in the context of the LET communication model. `
    },
    {
      category: "keynote",
      tabTitle: "Vincent Y. F. Tan",
      name: "Vincent Y. F. Tan",
      title: "Professor",
      affiliation: "National University of Singapore.",
      email: "vtan@nus.edu.sg",
      photo: "images/speakers/vtan9.jpg",
      type: "Invited Speaker",
      expertise: "Information Theory / Statistical Signal Processing / Machine Learning",
      talkTitle: "Muon Outperforms Adam in Tail-End Associative Memory Learning",
      abstract: `The Muon optimizer is consistently faster than Adam in training Large Language Models (LLMs), yet the mechanism underlying its success remains unclear. This paper demystifies this mechanism through the lens of associative memory. By ablating the transformer components optimized by Muon, we reveal that the associative memory parameters of LLMs, namely the Value and Output (VO) attention weights and Feed-Forward Networks (FFNs), are the primary contributors to Muon’s superiority. Motivated by this associative memory view, we then explain Muon’s superiority on real-world corpora, which are intrinsically heavy-tailed: a few 'head' classes are extremely frequent, while a vast number of 'tail' classes are individually rare. The superiority is explained through two key properties: (i) its update rule consistently yields a more isotropic singular spectrum than Adam; and as a result, (ii) on heavy-tailed data, it optimizes tail classes more effectively than Adam. Beyond empirical evidence, we theoretically confirm these findings by analyzing a one-layer associative memory model under class-imbalanced data. We prove that Muon consistently achieves balanced learning across classes regardless of feature embeddings, whereas Adam can induce large disparities in learning errors depending on embedding properties. In summary, our empirical observations and theoretical analyses reveal Muon’s core advantage: its update rule aligns with the outer-product structure of linear associative memories, enabling more balanced and effective learning of tail classes in heavy-tailed distributions than Adam.`
    },

    {
      category: "others",
      tabTitle: "Nadym Mallek",
      name: "Nadym Mallek",
      title: "PhD Graduate",
      affiliation: "Hasso Plattner Institute.",
      email: "nadym.mallek@hpi.de",
      photo: "images/speakers/csm_Nadym_Mallek_679815004c.jpg",
      type: "Invited Speaker",
      expertise: "Approximation Algorithms / Structural Algorithmics for Network Cut and Partitioning Problems",
      talkTitle: "Exploiting Tree-Like Structure in Graph Partitioning Problems",
      abstract: `Graph partitioning problems such as Multicut and Requirement Cut are central in combinatorial optimization, yet remain notoriously hard to approximate in general graphs. In this talk, we show how tree-like structure can be systematically exploited to obtain improved approximation guarantees.
      
We focus on graph classes that exhibit structural similarity to trees, including bounded-treewidth graphs and series-parallel graphs of bounded depth. For Multicut, we present a combinatorial primal–dual framework on treewidth-2 graphs that extends augmenting-path techniques to the multicommodity setting, yielding constant-factor approximations. We then introduce a region-growing approach tailored to tree decompositions, leading to logarithmic approximation guarantees parameterized by the treewidth.

For the more general Requirement Cut problem, we identify structural parameters that capture different notions of tree-likeness, such as a bounded number of spanning (or Steiner) trees and bounded depth in series-parallel graphs. Leveraging these properties, we design LP-based algorithms that achieve single-logarithmic approximation factors.

Overall, the results highlight how combining combinatorial and LP-based techniques with appropriate structural insights allows us to go beyond worst-case guarantees, and clarify which aspects of tree-like structure are most beneficial for graph partitioning problems.`
    },
    {
      category: "others",
      tabTitle: "Philip Cervenjak",
      name: "Philip Cervenjak",
      title: "PhD Graduate",
      affiliation: "University of Melbourne.",
      email: "",
      photo: "images/speakers/1520389726397.jpg",
      type: "Invited Speaker",
      expertise: "Combinatorial Optimization / Approximation Algorithms / Beyond-Worst-Case Analysis of Algorithms",
      talkTitle: "A Radius-Sensitive Approximation Algorithm for Connected Submodular Maximization",
      abstract: `Connected Submodular Maximization (CSM) and its Directed and Directed Rooted variants (DCSM and DRCSM) are graph problems with important applications to wireless network deployment, path planning, reconstructing epidemic outbreaks, and cancer genome studies. Formally, in (Directed) CSM, we are given a (directed) graph G, a non-negative monotone submodular function f on subsets of G’s vertices, and an integer k. The goal is to select an (out-)tree in G, with k edges, whose vertex set maximizes f. DRCSM further specifies a vertex in G to be the root of the selected out-tree.

For CSM, previous works have proposed approximation algorithms, which find a solution that maximizes f to within some factor. The state-of-the-art polynomial time algorithm achieves an Omega(1/sqrt{k})-approximation. We can also parameterize the approximation factor by the optimal tree’s radius, r, which is the maximum length of a path from its central vertex to any of its other vertices. This is a natural parameter to consider, especially in ‘small-world’ graph instances. However, the state-of-the-art polynomial time algorithm achieves an Omega(1/r)-approximation; ideally, the dependence on r in the approximation factor would match the best dependence on k.

This talk presents my recent work (accepted to AAMAS 2026) which improves on the state-of-the-art approximation algorithms for CSM with respect to r as well as k. We propose a polynomial time framework that, for (Directed) CSM, achieves an Omega(eps^3/r^{eps})-approximation for every constant eps between 0 and 1. For DRCSM, our framework achieves an Omega(delta eps^3/r^{eps})-approximation that violates the size constraint by at most a factor of 1+delta for every delta between 1/k and 1. A key component of our framework is GreedyRadius, an algorithm for DRCSM that converts another algorithm’s approximation from depending on k to depending on r. Moreover, to use a subroutine for DRCSM, we propose a recursive greedy algorithm called RecApprox-d, where d denotes the number of levels of recursion used.`
    },
    {
      category: "panel",
      tabTitle: "Yi-Ting Chen",
      name: "Yi-Ting Chen",
      title: "Associate Professor",
      affiliation: "Department of Computer Science, NYCU.",
      email: "ychen@cs.nycu.edu.tw",
      photo: "images/speakers/Cjz6vor1i5qHyZjEjaatROOaMOR9EgVwP2CN3c2o.png",
      type: "Invited Speaker",
      expertise: "Human-centered Physical AI / Intelligent Driving Systems / Assistive Robotics / Computer Vision / Machine Learning",
      abstract: ""
    },
    {
      category: "panel",
      tabTitle: "Ting-Jung Chang",
      name: "Ting-Jung Chang",
      title: "Assitant Professor",
      affiliation: "Department of Computer Science, NYCU.",
      email: " tingchang@cs.nycu.edu.tw",
      photo: "images/speakers/R61YssxjL04WMWujNrLbIE6FqeIMVIlf9IJ95Q7Z.png",
      type: "Invited Speaker",
      expertise: "Computer Architecture / Digital VLSI Design",
      abstract: ""
    },
    {
      category: "panel",
      tabTitle: "Yung-Ju Chang",
      name: "Yung-Ju Stanley Chang",
      title: "Professor",
      affiliation: "Department of Computer Science, NYCU.",
      email: "armuro@nycu.edu.tw",
      photo: "images/speakers/fTQOrGKfJ7SQBteW5Db6nU5my8dpmMKYVmbp7Osz.png",
      type: "Invited Speaker",
      expertise: "Human Computer Interaction / Context-Aware Computing / Information Behavior",
      abstract: ""
    },
    {
      category: "panel",
      tabTitle: "Yu-Chun Yen",
      name: "Yu-Chun Yen",
      title: "Assitant Professor",
      affiliation: "Department of Computer Science, NYCU.",
      email: "yyen@cs.nycu.edu.tw",
      photo: "images/speakers/TxnBkEZOOQ1980JVAO9QD3U4Lg1cIzuvZ6upLWgE.png",
      type: "Invited Speaker",
      expertise: "Collective Intelligence / Creativity Support / Computer-supported Communication / Human-AI Collaboration",
      abstract: ""
    },
  ];

function initSchedule() {
  console.log('initSchedule() called');
  // If the schedule containers are not yet present in the current DOM,
  // defer initialization until they appear. This prevents noisy warnings
  // when SPA navigation causes scripts to run before the page fragment
  // has been inserted.
  const hasDayTabs = !!document.getElementById('day-tabs');
  const hasScheduleDay = !!document.getElementById('schedule-day');
  if (!hasDayTabs || !hasScheduleDay) {
    if (!_scheduleObserverAttached) {
      _scheduleObserverAttached = true;
      const observer = new MutationObserver((mutations, obs) => {
        if (document.getElementById('day-tabs') && document.getElementById('schedule-day')) {
          obs.disconnect();
          _scheduleObserverAttached = false;
          try { initSchedule(); } catch (e) { console.error('initSchedule error', e); }
        }
      });
      observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

      // Fallback: if the DOM doesn't appear within a short time, try again once
      setTimeout(() => {
        if (document.getElementById('day-tabs') && document.getElementById('schedule-day')) {
          try { initSchedule(); } catch (e) { console.error('initSchedule error', e); }
        }
      }, 300);
    }
    console.log('initSchedule: DOM not ready, deferring initialization');
    return;
  }
  // If we already fetched data, just re-render into current DOM
  if (scheduleData && scheduleData.length > 0) {
    days = Array.from(new Set(scheduleData.map(s => String(s.day || '').trim()).filter(Boolean))).sort((a,b)=> (Number(a) || 0) - (Number(b) || 0));
    renderDayTabs();
    // try to preserve selected tab
    const activeTab = document.querySelector('.day-tab.active');
    const startDay = activeTab ? activeTab.dataset.day : (days[0] || undefined);
    if (startDay) renderDay(startDay);
    _scheduleInitialized = true;
    return;
  }

  // otherwise fetch CSV and initialize
  try {
    const resolvedCSV = new URL(CSV_URL, window.location.href).href;
    console.log('initSchedule: fetching CSV from', resolvedCSV);
  } catch (e) {
    console.log('initSchedule: fetching CSV from (raw)', CSV_URL);
  }
  const fetchUrl = (window.cacheUtils && typeof window.cacheUtils.appendCacheBuster === 'function')
    ? window.cacheUtils.appendCacheBuster(CSV_URL)
    : CSV_URL;
  fetch(fetchUrl, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    }
  })
    .then(res => {
      console.log('initSchedule: fetch response', res.status, res.url);
      if (!res.ok) {
        throw new Error('CSV fetch failed: ' + res.status);
      }
      return res.text();
    })
    .then(text => {
      scheduleData = parseCSV(text);
      console.log('schedule CSV parsed — rows:', scheduleData.length);
      days = Array.from(new Set(scheduleData.map(s => String(s.day || '').trim()).filter(Boolean))).sort((a,b)=> (Number(a) || 0) - (Number(b) || 0));
      renderDayTabs();
      if (days.length) renderDay(days[0]);
      _scheduleInitialized = true;
    })
    .catch(err => {
      console.error('Failed to load schedule CSV:', err);
    });

  // fallback: if scheduleData still empty shortly after initial fetch,
  // try fetching with an absolute path (covers edge cases with base URL).
  setTimeout(() => {
    if (scheduleData.length === 0) {
      const alt = 'data/schedule.csv';
      console.log('initSchedule: no data after initial fetch — retrying with', alt);
      const altUrl = (window.cacheUtils && typeof window.cacheUtils.appendCacheBuster === 'function')
        ? window.cacheUtils.appendCacheBuster(alt)
        : alt;
      fetch(altUrl, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }).then(r => {
        if (!r.ok) throw new Error('alt fetch failed: ' + r.status);
        return r.text();
      }).then(text => {
        scheduleData = parseCSV(text);
        console.log('initSchedule: alt CSV parsed — rows:', scheduleData.length);
        days = Array.from(new Set(scheduleData.map(s => String(s.day || '').trim()).filter(Boolean))).sort((a,b)=> (Number(a) || 0) - (Number(b) || 0));
        renderDayTabs();
        if (days.length) renderDay(days[0]);
        _scheduleInitialized = true;
      }).catch(e => console.error('initSchedule: alt fetch failed', e));
    }
  }, 350);
}

// expose for page-loader
window.initSchedule = initSchedule;

function parseCSV(text) {
  // split into non-empty lines and normalize header names
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) { console.warn('parseCSV: no lines found in CSV'); return []; }
  const rawHeaders = lines.shift().split(",").map(h => h.trim());
  const headers = rawHeaders.map(h => String(h).toLowerCase());
  console.log('parseCSV: headers=', headers);

  return lines.map(line => {
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const obj = {};
    headers.forEach((h, i) => {
      const raw = values[i] ?? "";
      obj[h] = raw.replace(/^"|"$/g, "").trim();
    });
    return obj;
  });
}

function renderDayTabs() {
  const tabs = document.getElementById('day-tabs');
  if (!tabs) { console.warn('renderDayTabs: #day-tabs not found in DOM'); return; }
  tabs.innerHTML = '';
  days.forEach((day, i) => {
    const btn = document.createElement('button');
    btn.className = 'day-tab' + (i===0 ? ' active' : '');
    btn.dataset.day = day;
    // show date on the tab if available in CSV
    const sample = scheduleData.find(s => String(s.day) === String(day));
    const dayDate = sample?.date || '';
    btn.textContent = dayDate ? `Day ${day} - ${dayDate}` : `Day ${day}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderDay(day);
    });
    tabs.appendChild(btn);
  });
}

function renderDay(day) {
  const container = document.getElementById('schedule-day');
  if (!container) { console.warn('renderDay: #schedule-day not found in DOM');
    // retry shortly in case DOM is still being updated
    setTimeout(() => { const c = document.getElementById('schedule-day'); if (c) renderDay(day); }, 120);
    return;
  }
  container.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'day-header';

  const dayItems = scheduleData.filter(item => String(item.day) === String(day)).sort((a,b)=> (a.time||'').localeCompare(b.time||''));
  const date = dayItems[0]?.date || '';
  header.textContent = date ? `Day ${day} - ${date}` : `Day ${day}`;
  container.appendChild(header);

  // separator before the first row of the day
  if (dayItems.length > 0) {
    const sep = document.createElement('div');
    sep.className = 'day-separator';
    container.appendChild(sep);
  }

  dayItems.forEach(item => {
    // use the new CSV columns: title and speaker
    const title = item.title || item[`title_${currentLang}`] || item.title_en || '';
    const speaker = item.speaker || item.speaker_en || '';
    const speakerList = splitSpeakers(speaker);

    const speakerHTML = speakerList.map(name => {
    return `<a href="#" class="speaker-link">${escapeHtml(name)}</a>`;
    }).join(', ');
    const div = document.createElement('div');
    // add classes when the talk type is plenary or keynote for styling
    const typeNorm = String(item.type || '').toLowerCase();
    const classes = ['talk'];
    if (typeNorm === 'plenary') classes.push('plenary');
    if (typeNorm === 'keynote') classes.push('keynote');
    // treat any type containing 'break' as a break row
    if (typeNorm.includes('break')) classes.push('break');
    // treat panels similarly to breaks (light yellow)
    if (typeNorm.includes('panel')) classes.push('panel');
    div.className = classes.join(' ');
    div.innerHTML = `
      <div class="time">${item.time || ''}</div>
      <div class="content">
        <div class="title">${escapeHtml(title)}</div>
        ${speaker ? `<div class="speaker">${speakerHTML}</div>` : ''}
      </div>
    `;
    const speakerLinks = div.querySelectorAll('.speaker-link');
speakerLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSpeakerModal(link.textContent.trim());
  });
});

    container.appendChild(div);
  });
}
function splitSpeakers(speakerStr) {
  return speakerStr
    .split(/\band\b|,|;/i)   // split by "and", "," or ";"
    .map(s => s.trim())
    .filter(s => s.length > 0);
}
function cleanName(name) {
  return name
    .replace(/\(.*?\)/g, '')   // remove (...) 
    .replace(/\s+/g, ' ')      // normalize spaces
    .trim()
    ;
}
function showSpeakerModal(speakerName) {
  const modal = document.getElementById('speaker-modal');
  const body = document.getElementById('speaker-modal-body');

  // normalize function: remove parentheses, trim, lowercase
  const normalize = str => str.replace(/[()]/g, '').trim();

  const target = cleanName(speakerName);

const sp = speakers.find(s => {
  return cleanName(s.tabTitle) === target ||
         cleanName(s.name).includes(target);
});

  if (!sp) {
    body.innerHTML = `<p>Speaker info not found: ${target}</p>`;
  } else {
    body.innerHTML = `
      <img src="${sp.photo}" class="speaker-photo" alt="${sp.tabTitle}">
      <div class="speaker-info">
        <h2>${sp.tabTitle}</h2>
        ${sp.title ? `<p><strong>Title:</strong> ${sp.title}</p>` : ''}
        ${sp.affiliation ? `<p><strong>Affiliation:</strong> ${sp.affiliation}</p>` : ''}
        ${sp.expertise ? `<p><strong>Expertise:</strong> ${sp.expertise}</p>` : ''}
        ${sp.talkTitle ? `<p><strong>Talk:</strong> ${sp.talkTitle}</p>` : ''}
        ${sp.abstract ? `<p><strong>Abstract:</strong> ${sp.abstract}</p>` : ''}
      </div>
    `;
  }

  modal.style.display = 'flex';

  document.getElementById('speaker-modal-close').onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
}
// small helper to avoid injecting raw CSV content as HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Ensure initSchedule runs when the schedule container appears in the DOM.
// This covers cases where the script is loaded before the SPA inserts the page
// as well as when the script is appended after the DOM is already present.
function _ensureScheduleInitOnDom() {
  if (typeof initSchedule !== 'function') return;
  if (document.getElementById('schedule-day')) {
    try { initSchedule(); } catch (e) { console.error('initSchedule error', e); }
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {
    if (document.getElementById('schedule-day')) {
      try { initSchedule(); } catch (e) { console.error('initSchedule error', e); }
      obs.disconnect();
    }
  });
  observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
}

_ensureScheduleInitOnDom();
