document.addEventListener("DOMContentLoaded", () => {
  const files = [
    { key: "site-content", path: "assets/data/site-content.json" },
    { key: "practice-areas", path: "assets/data/practice-areas.json" },
    { key: "faq", path: "assets/data/faq.json" },
    { key: "testimonials", path: "assets/data/testimonials.json" }
  ];

  const adminForm = document.querySelector("[data-admin-form]");
  const statusBox = document.querySelector("[data-admin-status]");
  const outputBox = document.querySelector("[data-admin-output]");
  const exportButton = document.querySelector("[data-export-json]");
  const state = {};

  const setStatus = (message, isError = false) => {
    if (!statusBox) {
      return;
    }

    statusBox.textContent = message;
    statusBox.style.color = isError ? "#8d1d32" : "#455466";
  };

  const fetchJson = async (path) => {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Datei konnte nicht geladen werden: ${path}`);
    }
    return response.json();
  };

  const addField = (labelText, fieldName, value, section = "Allgemein") => {
    if (!adminForm) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "field field-full";

    const label = document.createElement("label");
    label.setAttribute("for", fieldName);
    label.textContent = `${section}: ${labelText}`;

    const textarea = document.createElement("textarea");
    textarea.id = fieldName;
    textarea.name = fieldName;
    textarea.value = value;
    textarea.dataset.key = fieldName;
    textarea.addEventListener("input", () => {
      state[fieldName] = textarea.value;
      renderOutput();
    });

    wrapper.append(label, textarea);
    adminForm.append(wrapper);
  };

  const renderOutput = () => {
    const faq = (filesMap.faq || []).map((item, index) => ({
      question: state[`faq-question-${index}`] || item.question,
      answer: state[`faq-answer-${index}`] || item.answer
    }));

    const testimonials = (filesMap.testimonials || []).map((item, index) => ({
      role: state[`testimonial-role-${index}`] || item.role,
      quote: state[`testimonial-text-${index}`] || item.quote
    }));

    const exported = {
      site: {
        heroHeadline: state.heroHeadline || "",
        heroSubheadline: state.heroSubheadline || "",
        practiceIntro: state.practiceIntro || "",
        aboutIntro: state.aboutIntro || "",
        honorareIntro: state.honorareIntro || "",
        ctaPrimary: state.ctaPrimary || "",
        ctaSecondary: state.ctaSecondary || ""
      },
      practiceAreas: (filesMap["practice-areas"] || []).map((item) => ({ ...item })),
      faq,
      testimonials
    };

    if (outputBox) {
      outputBox.textContent = JSON.stringify(exported, null, 2);
    }
  };

  const filesMap = {};

  const loadData = async () => {
    if (!adminForm) {
      return;
    }

    setStatus("Inhalte werden geladen ...");

    try {
      for (const file of files) {
        filesMap[file.key] = await fetchJson(file.path);
      }

      state.heroHeadline = filesMap["site-content"].hero.headline;
      state.heroSubheadline = filesMap["site-content"].hero.subheadline;
      state.practiceIntro = filesMap["site-content"].practiceIntro;
      state.aboutIntro = filesMap["site-content"].about.intro;
      state.honorareIntro = filesMap["site-content"].honorare.intro;
      state.ctaPrimary = filesMap["site-content"].cta.primary;
      state.ctaSecondary = filesMap["site-content"].cta.secondary;

      addField("Hero Headline", "heroHeadline", state.heroHeadline, "Startseite");
      addField("Hero Subheadline", "heroSubheadline", state.heroSubheadline, "Startseite");
      addField("Practice-Area-Introtexte", "practiceIntro", filesMap["site-content"].practiceIntro, "Leistungsübersicht");
      addField("About-Intro", "aboutIntro", state.aboutIntro, "Über Dr. Werner");
      addField("Honorare-Intro", "honorareIntro", state.honorareIntro, "Honorare");
      addField("CTA Primär", "ctaPrimary", state.ctaPrimary, "CTAs");
      addField("CTA Sekundär", "ctaSecondary", state.ctaSecondary, "CTAs");

      filesMap.faq.forEach((item, index) => {
        addField(`FAQ ${index + 1}: Frage`, `faq-question-${index}`, item.question, "FAQ");
        addField(`FAQ ${index + 1}: Antwort`, `faq-answer-${index}`, item.answer, "FAQ");
      });

      filesMap.testimonials.forEach((item, index) => {
        addField(`Testimonial ${index + 1}: Rolle`, `testimonial-role-${index}`, item.role, "Testimonials");
        addField(`Testimonial ${index + 1}: Text`, `testimonial-text-${index}`, item.quote, "Testimonials");
      });

      setStatus("Inhalte geladen. Änderungen werden nur lokal im Browser verarbeitet.");
      renderOutput();
    } catch (error) {
      setStatus("JSON-Dateien konnten nicht geladen werden. Öffnen Sie den Prototyp idealerweise über GitHub Pages oder einen lokalen statischen Dateiserver. Änderungen können sonst nicht automatisch eingelesen werden.", true);
      if (outputBox) {
        outputBox.textContent = error.message;
      }
    }
  };

  if (exportButton) {
    exportButton.addEventListener("click", () => {
      const blob = new Blob([outputBox ? outputBox.textContent : "{}"], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "dr-werner-associates-content-export.json";
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  loadData();
});
