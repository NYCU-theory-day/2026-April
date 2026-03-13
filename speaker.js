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
      abstract: ""
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
      category: "plenary",
      tabTitle: "Koustav Bhanja",
      name: "Koustav Bhanja",
      title: "Postdoctoral Researcher",
      affiliation: "Weizmann Institute",
      email: "koustav.bhanja@weizmann.ac.il ",
      photo: "images/speakers/unnamed.jpg",
      type: "Invited Speaker",
      expertise: "Sensitivity Oracles (Fault-tolerant data structures) and efficient Dynamic Algorithms / Data structures and Algorithms",
      abstract: ""
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
      abstract: ""
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
      abstract: ""
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
      category: "others",
      tabTitle: "Changyeol Lee",
      name: "Changyeol Lee",
      title: " PhD Student",
      affiliation: "Yonsei University.",
      email: "changyeollee@yonsei.ac.kr ",
      photo: "images/speakers/me.jpg",
      type: "Invited Speaker",
      expertise: "Approximation Algorithms / Online Algorithms / Learning-augmented Algorithms / Combinatorial Optimization",
      abstract: ""
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
      abstract: ""
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
      abstract: ""
    },
    {
      category: "keynote",
      tabTitle: "Vincent Y. F. Tan",
      name: "Vincent Y. F. Tan",
      title: "Professor",
      affiliation: "National University of Singapore.",
      email: "vtan@nus.edu.sg",
      photo: "images/speakers/vtan7.png",
      type: "Invited Speaker",
      expertise: "Information Theory / Statistical Signal Processing / Machine Learning",
      abstract: ""
    },

    {
      category: "panel",
      tabTitle: "Vincent Y. F. Tan",
      name: "Vincent Y. F. Tan",
      title: "Professor",
      affiliation: "National University of Singapore.",
      email: "vtan@nus.edu.sg",
      photo: "images/speakers/vtan7.png",
      type: "Invited Speaker",
      expertise: "Information Theory / Statistical Signal Processing / Machine Learning",
      abstract: ""
    },
    {
      category: "others",
      tabTitle: "Nadym Mallek",
      name: "Nadym Mallek",
      title: "PhD Student",
      affiliation: "Hasso Plattner Institute.",
      email: "nadym.mallek@hpi.de",
      photo: "images/speakers/csm_Nadym_Mallek_679815004c.jpg",
      type: "Invited Speaker",
      expertise: "",
      abstract: ""
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
      expertise: "",
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
      expertise: "",
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
      expertise: "",
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
      expertise: "",
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
