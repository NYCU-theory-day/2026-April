function initSpeakers() {
  const categoryTabsContainer = document.getElementById("speaker-category-tabs");
  const tabsContainer = document.getElementById("speaker-tabs");
  if (!categoryTabsContainer || !tabsContainer) return;

  categoryTabsContainer.innerHTML = "";
  tabsContainer.innerHTML = "";

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
      tabTitle: "Vincent Y.F. Tan",
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
      tabTitle: "Yung-Ju Stanley Chang",
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

  const categories = [
    { key: "keynote", label: "Keynote Lectures" },
    { key: "plenary", label: "Invited Talks (I)" },
    { key: "others", label: "Invited Talks (II)" },
    { key: "panel", label: "Lunch Panels" }
  ];

  let activeCategory = "keynote";

  function getSpeakersByCategory(categoryKey) {
    return speakers
      .filter((speaker) => speaker.category === categoryKey)
      .sort((a, b) => {
        const surnameA = a.tabTitle.trim().split(/\s+/).pop().toLowerCase();
        const surnameB = b.tabTitle.trim().split(/\s+/).pop().toLowerCase();
        if (surnameA !== surnameB) return surnameA.localeCompare(surnameB);
        return a.tabTitle.localeCompare(b.tabTitle);
      });
  }

  function renderCategoryTabs() {
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.className = "speaker-category-tab";
      button.textContent = category.label;
      button.dataset.categoryKey = category.key;
      button.onclick = () => selectCategory(category.key);
      categoryTabsContainer.appendChild(button);
    });
  }

  function renderSpeakerTabs() {
    tabsContainer.innerHTML = "";

    const categorySpeakers = getSpeakersByCategory(activeCategory);

    categorySpeakers.forEach((speaker, index) => {
      const button = document.createElement("button");
      button.className = "speaker-tab";
      button.textContent = speaker.tabTitle;
      button.onclick = () => selectSpeaker(index);
      tabsContainer.appendChild(button);
    });

    if (categorySpeakers.length === 0) {
      renderEmptySpeaker();
      return;
    }

    selectSpeaker(0);
  }

  function selectCategory(categoryKey) {
    activeCategory = categoryKey;

    document.querySelectorAll(".speaker-category-tab").forEach((btn) =>
      btn.classList.remove("active")
    );

    const activeButton = categoryTabsContainer.querySelector(
      `.speaker-category-tab[data-category-key="${categoryKey}"]`
    );

    if (activeButton) {
      activeButton.classList.add("active");
    }

    renderSpeakerTabs();
  }

  function renderEmptySpeaker() {
    const photo = document.getElementById("speaker-photo");
    const name = document.getElementById("speaker-name");
    const title = document.getElementById("speaker-title");
    const affiliation = document.getElementById("speaker-affiliation");
    const expertise = document.getElementById("speaker-expertise");
    const email = document.getElementById("speaker-email");
    const type = document.getElementById("speaker-type");
    const abstractBox = document.getElementById("speaker-abstract-box");
    const abstractTitle = document.getElementById("speaker-abstract-title");
    const abstract = document.getElementById("speaker-abstract");
    const abstractTba = document.getElementById("speaker-abstract-tba");

    if (photo) photo.src = "https://via.placeholder.com/300x400";
    if (name) name.textContent = "No speakers yet";
    if (title) title.textContent = "";
    if (affiliation) affiliation.textContent = "";
    if (expertise) expertise.textContent = "Expertise: TBA";
    if (email) {
      email.textContent = "";
      email.href = "#";
    }
    if (type) {
      type.textContent = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
    }
    if (abstractBox) abstractBox.style.display = "none";
    if (abstractTitle) abstractTitle.textContent = "Biography / Title / Abstract";
    if (abstract) abstract.textContent = "";
    if (abstractTba) {
      abstractTba.textContent = "TBAA";
      abstractTba.style.display = "block";
    }
  }

  function selectSpeaker(index) {
    const categorySpeakers = getSpeakersByCategory(activeCategory);
    const speaker = categorySpeakers[index];
    if (!speaker) {
      renderEmptySpeaker();
      return;
    }

    document.querySelectorAll(".speaker-tab").forEach(btn =>
      btn.classList.remove("active")
    );
    document.querySelectorAll(".speaker-tab")[index].classList.add("active");

    const photo = document.getElementById("speaker-photo");
    const name = document.getElementById("speaker-name");
    const title = document.getElementById("speaker-title");
    const affiliation = document.getElementById("speaker-affiliation");
    const expertise = document.getElementById("speaker-expertise");
    const email = document.getElementById("speaker-email");
    const type = document.getElementById("speaker-type");
    const abstractBox = document.getElementById("speaker-abstract-box");
    const talktitle = document.getElementById("speaker-talk-title");
    const abstract = document.getElementById("speaker-abstract");

    if (photo) photo.src = speaker.photo;
    if (name) name.textContent = speaker.name;
    if (title) title.textContent = speaker.title;
    if (affiliation) affiliation.textContent = speaker.affiliation;
    if (expertise) expertise.textContent = `${speaker.expertise || "TBA"}`;
    if (email) {
      email.textContent = speaker.email;
      email.href = "mailto:" + speaker.email;
    }
    if (type) type.textContent = speaker.type;
    const hasAbstract = typeof speaker.abstract === "string" && speaker.abstract.trim() !== "";
    if (abstractBox) abstractBox.style.display = hasAbstract ? "block" : "none";
    if (talktitle) talktitle.textContent = hasAbstract ? speaker.talkTitle : "";
    if (abstract) abstract.textContent = hasAbstract ? speaker.abstract : "";
  }

  renderCategoryTabs();
  selectCategory(activeCategory);
}
