function initSpeakers() {
  const tabsContainer = document.getElementById("speaker-tabs");
  if (!tabsContainer) return;

  tabsContainer.innerHTML = "";

  const speakers = [
    {
      tabTitle: "Hee-Kap Ahn",
      name: "Hee-Kap Ahn / 안희갑 / 安熙甲",
      title: "Professor, Dept. Computer Science and Engineering Graduate School of Artificial Intelligence",
      affiliation: "Pohang University of Science and Technology (POSTECH)",
      email: "heekap@postech.ac.kr",
      photo: "images/speakers/heekap.png",
      type: "Keynote Speaker",
      abstract: "https://heekap.github.io/"
    },
    {
      tabTitle: "Kazuhisa Makino",
      name: "Kazuhisa Makino",
      title: "Professor",
      affiliation: "Kyto University",
      email: "add @kurims.kyoto-u.ac.jp",
      photo: "images/speakers/makino.jpg",
      type: "Keynote Speaker",
      abstract: "https://www.kurims.kyoto-u.ac.jp/en/list/makino.html"
    },
    {
      tabTitle: "Koustav Bhanja",
      name: "Koustav Bhanja",
      title: "postdoctoral researcher",
      affiliation: "Weizmann Institute",
      email: "koustav.bhanja@weizmann.ac.il ",
      photo: "images/speakers/unnamed.jpg",
      type: "Invited Speaker",
      abstract: "https://sites.google.com/view/koustav-bhanja/home"
    },
    {
      tabTitle: "Michelle Döring",
      name: "Michelle Döring",
      title: "PhD student",
      affiliation: "Hasso Plattner Institute",
      email: "michelle.doering@hpi.de ",
      photo: "images/speakers/csm_michelle_doering_ce43ac8db1.jpg",
      type: "Invited Speaker",
      abstract: "https://michelledoering.notion.site/"
    },
    {
      tabTitle: "Shang-En Huang",
      name: "黃上恩(Shang-En Huang)",
      title: "assistant professor",
      affiliation: "National Taiwan University",
      email: "	sehuang@csie.ntu.edu.tw",
      photo: "images/speakers/照片-黃上恩-1.jpg",
      type: "Invited Speaker",
      abstract: "	https://tmt514.github.io/"
    },
    {
      tabTitle: "William Umboh",
      name: "William Umboh",
      title: "Lecturer",
      affiliation: "The University of Melbourne",
      email: "",
      photo: "images/speakers/profilepic-cropped.jpg",
      type: "Invited Speaker",
      abstract: "https://williamumboh.com/"
    },
    {
      tabTitle: "Michael Zlatin",
      name: "Michael Zlatin",
      title: " Assistant Professor",
      affiliation: " Pomona College.",
      email: "michael.zlatin@pomona.edu",
      photo: "images/speakers/mik_pic.png",
      type: "Invited Speaker",
      abstract: "https://mzlatin.github.io/"
    }
  ];

  function renderTabs() {
    speakers.forEach((speaker, index) => {
      const button = document.createElement("button");
      button.className = "speaker-tab";
      button.textContent = speaker.tabTitle;
      button.onclick = () => selectSpeaker(index);
      tabsContainer.appendChild(button);
    });
  }

  function selectSpeaker(index) {
    const speaker = speakers[index];

    document.querySelectorAll(".speaker-tab").forEach(btn =>
      btn.classList.remove("active")
    );
    document.querySelectorAll(".speaker-tab")[index].classList.add("active");

    document.getElementById("speaker-photo").src = speaker.photo;
    document.getElementById("speaker-name").textContent = speaker.name;
    document.getElementById("speaker-title").textContent = speaker.title;
    document.getElementById("speaker-affiliation").textContent = speaker.affiliation;
    document.getElementById("speaker-email").textContent = speaker.email;
    document.getElementById("speaker-email").href = "mailto:" + speaker.email;
    document.getElementById("speaker-type").textContent = speaker.type;
    document.getElementById("speaker-abstract").textContent = speaker.abstract;
  }

  renderTabs();
  selectSpeaker(0);
}
