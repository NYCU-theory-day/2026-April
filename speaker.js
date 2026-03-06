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
      abstract: "https://heekap.github.io/"
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
      abstract: "https://www.kurims.kyoto-u.ac.jp/en/list/makino.html"
    },
    {
      category: "postdoc",
      tabTitle: "Koustav Bhanja",
      name: "Koustav Bhanja",
      title: "Postdoctoral Researcher",
      affiliation: "Weizmann Institute",
      email: "koustav.bhanja@weizmann.ac.il ",
      photo: "images/speakers/unnamed.jpg",
      type: "Invited Speaker",
      expertise: "Sensitivity Oracles (Fault-tolerant data structures) and efficient Dynamic Algorithms / Data structures and Algorithms",
      abstract: "https://sites.google.com/view/koustav-bhanja/home"
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
      abstract: "https://michelledoering.notion.site/"
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
      abstract: "https://mzlatin.github.io/"
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
      abstract: "	https://tmt514.github.io/"
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
      abstract: "https://williamumboh.com/"
    },
    
    {
      category: "postdoc",
      tabTitle: "Philip Cervenjak",
      name: "Philip Cervenjak",
      title: "PhD",
      affiliation: "University of Melbourne.",
      email: " philip.cervenjak@unimelb.edu.au",
      photo: "images/speakers/1520389726397.jpg",
      type: "Invited Speaker",
      expertise: "Submodular Optimization and Algorithms",
      abstract: "https://www.linkedin.com/in/philip-cervenjak/"
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
      abstract: "https://chang-yeol.github.io/"
    },
    {
      category: "others",
      tabTitle: "Rin Saito",
      name: "Rin Saito",
      title: " PhD Student",
      affiliation: "Tohoku University.",
      email: "rin.saito@dc.tohoku.ac.jp",
      photo: "images/speakers/_fix.jpg",
      type: "Invited Speaker",
      expertise: "Graph Algorithms / Parameterized Complexity / Combinatorial Reconfiguration",
      abstract: "https://srin728.github.io/"
    },
    {
      category: "postdoc",
      tabTitle: "Mario Günzel",
      name: "Mario Günzel",
      title: "Postdoctoral Researcher",
      affiliation: "Max-Planck Institute.",
      email: "",
      photo: "images/speakers/csm_profile_guenzel_4f59db872a.webp",
      type: "Invited Speaker",
      expertise: "Real-Time System Scheduling / Embedded Systems / Schedulability Tests / Scheduling Algorithms",
      abstract: "https://daes.cs.tu-dortmund.de/staff/scientific-staff/dr-rer-nat-mario-guenzel/"
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
      abstract: "https://vyftan.github.io/"
    },

  ];

  const categories = [
    { key: "keynote", label: "Keynote Lectures" },
    { key: "plenary", label: "Invited Talks (I)" },
    { key: "postdoc", label: "Invited Talks (II)" },
    { key: "others", label: "Invited Talks (III)" }
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
    const abstract = document.getElementById("speaker-abstract");

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
    if (abstract) abstract.textContent = "";
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
    if (abstract) abstract.textContent = speaker.abstract;
  }

  renderCategoryTabs();
  selectCategory(activeCategory);
}
