"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { animate, stagger, createTimeline } from "animejs";
import Image from "next/image";

/* ══════════════════════════════════════════════════════════
   DATA — Bahasa Indonesia
   ══════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Tentang", href: "#about" },
  { label: "Divisi", href: "#divisions" },
  { label: "Program", href: "#programs" },
  { label: "Galeri", href: "#gallery" },
  { label: "Kontak", href: "#contact" },
];

const DIVISIONS = [
  { title: "Pemrograman", desc: "Menguasai algoritma, struktur data, dan pemrograman kompetitif." },
  { title: "Desain UI/UX", desc: "Merancang pengalaman digital yang berpusat pada pengguna." },
  { title: "Kecerdasan Buatan", desc: "Machine learning, deep learning, NLP, dan computer vision." },
  { title: "Keamanan Siber", desc: "Ethical hacking, keamanan jaringan, dan sistem kriptografi." },
  { title: "Pengembangan Web", desc: "Aplikasi web full-stack dengan framework dan arsitektur modern." },
  { title: "Pengembangan Mobile", desc: "Aplikasi native dan cross-platform untuk iOS dan Android." },
  { title: "Multimedia", desc: "Produksi video, motion graphics, dan visual storytelling." },
  { title: "Hubungan Masyarakat", desc: "Komunikasi strategis, branding, dan pembangunan komunitas." },
  { title: "Riset & Pengembangan", desc: "Mendorong inovasi melalui penelitian akademis dan teknologi." },
  { title: "Kewirausahaan", desc: "Membangun startup, strategi bisnis, dan usaha teknologi." },
];

const PROGRAMS = [
  { title: "Workshop", desc: "Sesi teknis langsung dari dasar Git hingga arsitektur cloud.", period: "Bulanan" },
  { title: "Bootcamp", desc: "Program intensif multi-minggu di bidang web, mobile, AI, dan keamanan siber.", period: "Triwulan" },
  { title: "Hackathon", desc: "Sprint inovasi 48 jam membangun solusi untuk tantangan dunia nyata.", period: "Semester" },
  { title: "Seminar Teknologi", desc: "Pakar industri berbagi wawasan tentang teknologi terkini.", period: "Bulanan" },
  { title: "Kompetisi", desc: "Kontes coding, desain, dan inovasi skala nasional dan internasional.", period: "Berkelanjutan" },
  { title: "Study Club", desc: "Kelompok belajar mingguan yang fokus pada domain teknologi tertentu.", period: "Mingguan" },
  { title: "Pengabdian Masyarakat", desc: "Literasi digital dan pemberdayaan teknologi untuk komunitas lokal.", period: "Semester" },
  { title: "Festival Teknologi", desc: "Pameran besar dengan demo, pembicara, dan jaringan profesional.", period: "Tahunan" },
];

const STATS = [
  { value: 500, suffix: "+", label: "Anggota Aktif" },
  { value: 120, suffix: "+", label: "Acara Terselenggara" },
  { value: 85, suffix: "+", label: "Prestasi" },
  { value: 40, suffix: "+", label: "Kolaborasi" },
  { value: 2000, suffix: "+", label: "Jaringan Alumni" },
];

const GALLERY_ITEMS = [
  { src: "/gallery/hackathon.png", title: "Hackathon Nasional 2025", category: "Kompetisi" },
  { src: "/gallery/workshop.png", title: "Workshop Full-Stack", category: "Workshop" },
  { src: "/gallery/collaboration.png", title: "Kolaborasi Lintas Divisi", category: "Komunitas" },
  { src: "/gallery/seminar.png", title: "Seminar AI & Teknologi Masa Depan", category: "Seminar" },
  { src: "/gallery/competition.png", title: "Juara Regional Programming", category: "Kompetisi" },
  { src: "/gallery/community.png", title: "Program Literasi Digital", category: "Komunitas" },
];

const TESTIMONIALS = [
  {
    quote: "HIMASANTIKA mengubah cara pandang saya terhadap teknologi. Hackathon dan workshop memberikan kepercayaan diri dan keterampilan untuk mendapatkan magang impian di perusahaan teknologi ternama.",
    name: "Sarah Putri",
    role: "Intern Software Engineer",
    year: "Angkatan '23",
  },
  {
    quote: "Kemampuan kepemimpinan dan keahlian teknis yang saya peroleh sangat berperan dalam membangun karir saya. Komunitas di sini benar-benar luar biasa.",
    name: "Ahmad Rizky",
    role: "Senior Developer, Tokopedia",
    year: "Alumni '20",
  },
  {
    quote: "HIMASANTIKA merepresentasikan standar tertinggi untuk organisasi mahasiswa. Dampaknya terhadap pengembangan mahasiswa sangat luar biasa.",
    name: "Dr. Maya Sari",
    role: "Dosen Pembimbing",
    year: "Departemen Informatika",
  },
];

const FAQS = [
  { q: "Bagaimana cara bergabung dengan HIMASANTIKA?", a: "Pendaftaran dibuka setiap semester melalui website dan media sosial kami. Isi formulir pendaftaran, hadiri sesi orientasi, dan pilih divisi yang kamu minati. Semua mahasiswa Informatika disambut tanpa memandang tingkat pengalaman." },
  { q: "Apakah perlu pengalaman pemrograman sebelumnya?", a: "Tidak sama sekali. Kami menyambut mahasiswa dari semua tingkat keahlian dengan workshop ramah pemula, program mentoring, dan study club yang dirancang untuk membangun fondasi yang kuat." },
  { q: "Divisi apa saja yang tersedia?", a: "Kami memiliki 10 divisi khusus: Pemrograman, Desain UI/UX, Kecerdasan Buatan, Keamanan Siber, Pengembangan Web & Mobile, Multimedia, Hubungan Masyarakat, Riset & Pengembangan, dan Kewirausahaan." },
  { q: "Bagaimana HIMASANTIKA membantu pengembangan karir?", a: "Kami menyelenggarakan workshop karir, review CV, simulasi wawancara, dan acara networking dengan profesional industri. Jaringan alumni kami di perusahaan teknologi terkemuka menyediakan mentoring dan rujukan kerja." },
  { q: "Bisakah saya ikut kompetisi?", a: "Tentu saja! Kami sangat mendorong dan mendukung anggota dalam kompetisi nasional dan internasional dengan pelatihan, mentoring, dan dukungan pendanaan." },
];

const formatNum = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ══════════════════════════════════════════════════════════
   MOUSE FOLLOWER
   ══════════════════════════════════════════════════════════ */

function MouseFollower() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const followLoop = () => {
      if (cursor) cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
      requestAnimationFrame(followLoop);
    };
    const onEnter = () => cursor.classList.add("hovering");
    const onLeave = () => cursor.classList.remove("hovering");

    document.addEventListener("mousemove", onMove);
    setTimeout(() => cursor.classList.add("active"), 500);
    const raf = requestAnimationFrame(followLoop);

    const interactives = document.querySelectorAll("a, button, .interactive");
    interactives.forEach((el) => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el) => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  return <div ref={cursorRef} className="cursor-follower" />;
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-glass border-b border-border/50" : ""}`}>
      <div className="section-inner flex items-center justify-between h-16 lg:h-[72px]">
        <a href="#home" className="flex items-center gap-2.5">
          <Image src="/icon.jpg" alt="HIMASANTIKA" width={36} height={36} className="rounded-lg object-cover" />
          <span className="text-sm font-semibold tracking-tight font-[family-name:var(--font-heading)] hidden sm:block">
            HIMASANTIKA
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link-editorial">{l.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="#cta" className="nav-link-editorial hidden sm:block font-semibold !text-ink">
            Gabung →
          </a>
          <button
            className="lg:hidden flex flex-col gap-1 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[5.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[5.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden nav-glass border-t border-border/50">
          <div className="section-inner py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link-editorial text-base" onClick={() => setMobileOpen(false)}>{l.label}</a>
            ))}
            <a href="#cta" className="btn-editorial mt-2 text-center justify-center" onClick={() => setMobileOpen(false)}>Gabung HIMASANTIKA</a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO — Cinematic Entrance
   ══════════════════════════════════════════════════════════ */

function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = createTimeline({ defaults: { easing: "easeOutCubic" } });

    tl.add(badgeRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 800 }, 200)
      .add(headlineRef.current.querySelectorAll(".word"), {
        translateY: ["105%", "0%"],
        duration: 1000,
        delay: stagger(80),
      }, 400)
      .add(subtitleRef.current, { opacity: [0, 1], translateY: [30, 0], duration: 900 }, 1000)
      .add(ctaRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 700 }, 1300)
      .add(imageRef.current, {
        clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
        duration: 1200,
        easing: "easeInOutQuart",
      }, 600);
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex flex-col justify-end pb-16 lg:pb-24 pt-24 overflow-hidden">
      <div className="section-inner w-full relative z-10">
        <div ref={badgeRef} className="label mb-8" style={{ color: "var(--color-yellow)" }}>
          ● Himpunan Mahasiswa Informatika
        </div>

        <div ref={headlineRef} className="mb-8">
          <h1 className="display-xl">
            <span className="reveal-line block overflow-hidden">
              <span className="word inline-block">Membentuk</span>
            </span>
            <span className="reveal-line block overflow-hidden">
              <span className="word inline-block">Pemimpin Teknologi</span>
            </span>
            <span className="reveal-line block overflow-hidden">
              <span className="word inline-block" style={{ color: "var(--color-yellow)" }}>Masa Depan</span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <p ref={subtitleRef} className="body-lg max-w-lg">
            Pusat inovasi, kepemimpinan, dan kolaborasi — tempat para calon
            profesional teknologi mengubah ide menjadi dampak nyata.
          </p>
          <div ref={ctaRef} className="flex gap-6">
            <a href="#cta" className="btn-editorial">
              Gabung Sekarang
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#about" className="cta-link">
              Jelajahi
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div ref={imageRef} className="absolute top-0 right-0 w-full lg:w-[55%] h-full opacity-[0.12] lg:opacity-[0.18]">
        <Image src="/gallery/hackathon.png" alt="Komunitas HIMASANTIKA" fill className="object-cover" priority sizes="100vw" />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-ink-muted relative overflow-hidden">
          <div className="w-full h-4 bg-ink absolute top-0 left-0" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ABOUT — Narrative Unfolding
   ══════════════════════════════════════════════════════════ */

function About() {
  return (
    <section id="about" className="section-space overflow-hidden">
      <div className="section-inner">
        <div className="label mb-6">Tentang HIMASANTIKA</div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          <div>
            <div>
              <h2 className="display-lg mb-0">
                <span className="block">Di mana teknologi</span>
                <span className="block text-yellow">bertemu tujuan</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <p className="body-lg">
              Didirikan dengan visi menjembatani kesenjangan antara pembelajaran akademis dan
              kesiapan industri, HIMASANTIKA telah berkembang menjadi ekosistem yang dinamis
              di mana pikiran-pikiran penasaran bertemu, berkolaborasi, dan menciptakan
              teknologi bermakna yang berdampak pada kehidupan nyata.
            </p>
          </div>
        </div>

        <div className="img-reveal mb-24 rounded-2xl overflow-hidden">
          <div className="relative aspect-[21/9]">
            <Image src="/gallery/collaboration.png" alt="Tim HIMASANTIKA" fill className="object-cover" sizes="100vw" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-24">
          <div>
            <div className="label mb-4">Visi</div>
            <p className="display-md mb-4">Menjadi organisasi mahasiswa teknologi paling inovatif di tingkat nasional.</p>
            <p className="body-md">Menghasilkan talenta teknologi berkelas dunia yang mendorong transformasi digital dan menciptakan perubahan positif di masyarakat melalui keunggulan, integritas, dan rasa ingin tahu yang tiada henti.</p>
          </div>
          <div>
            <div className="label mb-4">Misi</div>
            <ul className="space-y-4">
              {[
                "Menumbuhkan budaya belajar berkelanjutan dan keunggulan teknologi",
                "Menyediakan workshop, hackathon, dan pelatihan berkelas dunia",
                "Menjembatani kesenjangan antara akademis dan industri",
                "Memberdayakan mahasiswa menjadi pemimpin dan agen perubahan",
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start body-md">
                  <span className="text-yellow font-semibold text-sm mt-0.5 flex-shrink-0">0{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="label mb-8">Nilai Inti</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Keunggulan", desc: "Standar tertinggi dalam segala hal yang kami lakukan" },
              { num: "02", title: "Integritas", desc: "Transparansi, kejujuran, dan tanggung jawab etis" },
              { num: "03", title: "Inklusivitas", desc: "Menyambut keragaman perspektif dan latar belakang" },
              { num: "04", title: "Rasa Ingin Tahu", desc: "Kehausan yang tak pernah padam akan pengetahuan" },
            ].map((v) => (
              <div key={v.num} className="value-item group">
                <span className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-border group-hover:text-yellow transition-colors duration-500 block mb-3">{v.num}</span>
                <h4 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-1">{v.title}</h4>
                <p className="text-sm text-ink-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   WHY — Feature Showcase
   ══════════════════════════════════════════════════════════ */

function Why() {
  const items = [
    { title: "Inovasi", desc: "Budaya pemecahan masalah kreatif dan pemikiran disruptif. Kami tidak mengikuti tren — kami menciptakannya." },
    { title: "Teknologi", desc: "Akses langsung ke tools terkini, mentor, dan sumber daya di setiap domain teknologi utama." },
    { title: "Kepemimpinan", desc: "Mengembangkan kemampuan kepemimpinan, komunikasi, dan manajemen proyek untuk industri teknologi." },
    { title: "Kolaborasi", desc: "Komunitas yang dinamis di mana ide-ide beragam bertemu untuk menciptakan solusi berdampak nyata." },
  ];

  return (
    <section className="section-space bg-paper-warm overflow-hidden">
      <div className="section-inner">
        <div className="label mb-6">Mengapa HIMASANTIKA</div>
        <div>
          {items.map((item, i) => (
            <div key={i} className="why-item border-t border-border py-10 lg:py-14 grid lg:grid-cols-12 gap-6 lg:gap-12 group">
              <div className="lg:col-span-1">
                <span className="text-sm font-semibold text-yellow">0{i + 1}</span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="display-md group-hover:text-yellow transition-colors duration-500">{item.title}</h3>
              </div>
              <div className="lg:col-span-7 flex items-center">
                <p className="body-lg">{item.desc}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   DIVISIONS — Interactive Showcase
   ══════════════════════════════════════════════════════════ */

function Divisions() {
  return (
    <section id="divisions" className="section-space overflow-hidden">
      <div className="section-inner">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="label mb-4">Divisi</div>
            <h2 className="display-lg">Sepuluh jalur<br />menuju keahlian</h2>
          </div>
          <p className="body-lg max-w-md">Divisi khusus yang menawarkan jalur pembelajaran mendalam di seluruh spektrum teknologi.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-border rounded-2xl overflow-hidden">
          {DIVISIONS.map((d, i) => (
            <div key={i} className="division-card bg-paper p-6 lg:p-8 group cursor-pointer hover:bg-paper-warm transition-colors duration-500 interactive">
              <span className="label block mb-6 group-hover:!text-yellow transition-colors">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-2 group-hover:text-yellow transition-colors duration-300">{d.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{d.desc}</p>
              <div className="mt-6 overflow-hidden h-0 group-hover:h-6 transition-all duration-500">
                <span className="text-xs font-semibold text-yellow flex items-center gap-2">
                  Jelajahi
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PROGRAMS — Student Experience Grid
   ══════════════════════════════════════════════════════════ */

function Programs() {
  return (
    <section id="programs" className="section-space bg-paper-warm overflow-hidden">
      <div className="section-inner">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="label mb-4">Program & Kegiatan</div>
            <h2 className="display-lg">Pengalaman<br />mahasiswa</h2>
          </div>
          <p className="body-lg max-w-md">
            Rangkaian kegiatan berkelanjutan untuk mengasah keterampilan teknis, kepemimpinan, dan jaringan profesional.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((p, i) => (
            <div
              key={i}
              className="program-card bg-paper rounded-2xl p-8 border border-border group hover:border-yellow/50 hover:shadow-lg transition-all duration-500 interactive flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow/10 text-yellow">
                    {p.period}
                  </span>
                </div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-3 group-hover:text-yellow transition-colors">
                  {p.title}
                </h3>
                <p className="body-md text-sm">{p.desc}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-ink-muted group-hover:text-yellow transition-colors">
                <span>Program #{String(i + 1).padStart(2, "0")}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   STATISTICS — Dark Section (100% Reliable Render)
   ══════════════════════════════════════════════════════════ */

function Statistics() {
  const numbersRef = useRef(null);

  useEffect(() => {
    if (!numbersRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = numbersRef.current.querySelectorAll(".stat-num");
            items.forEach((el) => {
              const target = parseInt(el.dataset.target, 10);
              const obj = { val: 0 };
              animate(obj, {
                val: target,
                duration: 2000,
                easing: "easeOutExpo",
                round: 1,
                onUpdate: () => {
                  el.textContent = formatNum(obj.val) + el.dataset.suffix;
                },
              });
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(numbersRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="section-space section-dark overflow-hidden">
      <div className="section-inner">
        <div className="label mb-6">Dampak</div>
        <h2 className="display-lg mb-16" style={{ color: "#fafaf9" }}>Cerita kami dalam angka</h2>

        <div ref={numbersRef} className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="stat-card">
              <div
                className="stat-num stat-number"
                data-target={s.value}
                data-suffix={s.suffix}
                style={{ color: "#fafaf9" }}
                suppressHydrationWarning
              >
                {formatNum(s.value)}{s.suffix}
              </div>
              <p className="mt-2 text-sm" style={{ color: "rgba(250,250,249,0.45)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   GALLERY — Immersive Exhibition
   ══════════════════════════════════════════════════════════ */

function Gallery() {
  return (
    <section id="gallery" className="section-space overflow-hidden">
      <div className="section-inner">
        <div className="label mb-4">Galeri</div>
        <h2 className="display-lg mb-16">Momen yang<br />mendefinisikan kami</h2>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} className={`gallery-item relative overflow-hidden rounded-2xl group interactive ${i === 0 || i === 3 ? "md:row-span-2" : ""}`}>
              <div className={`relative ${i === 0 || i === 3 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image src={item.src} alt={item.title} fill className="gallery-img object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 lg:p-8">
                <span className="label !text-white/60 mb-2">{item.category}</span>
                <h3 className="text-white font-semibold font-[family-name:var(--font-heading)] text-lg">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   TESTIMONIALS — Editorial Cards
   ══════════════════════════════════════════════════════════ */

function Testimonials() {
  const [active, setActive] = useState(0);
  const quoteRef = useRef(null);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    if (quoteRef.current) {
      animate(quoteRef.current, { opacity: [1, 0], translateY: [0, -20], duration: 300, easing: "easeInCubic",
        onComplete: () => { setActive(idx); animate(quoteRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 500, easing: "easeOutCubic" }); },
      });
    } else { setActive(idx); }
  }, []);

  const next = useCallback(() => goTo((active + 1) % TESTIMONIALS.length), [active, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const handleDot = (i) => { clearInterval(timerRef.current); goTo(i); timerRef.current = setInterval(() => goTo((p) => (p + 1) % TESTIMONIALS.length), 6000); };

  return (
    <section className="section-space bg-paper-warm overflow-hidden">
      <div className="section-inner">
        <div className="label mb-6">Testimoni</div>

        <div className="max-w-4xl">
          <div className="quote-mark mb-4">&ldquo;</div>
          <div ref={quoteRef}>
            <p className="display-md mb-10 !font-normal !tracking-[-0.02em]" style={{ lineHeight: 1.3 }}>{TESTIMONIALS[active].quote}</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center text-white text-sm font-semibold">
                {TESTIMONIALS[active].name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold font-[family-name:var(--font-heading)] text-sm">{TESTIMONIALS[active].name}</p>
                <p className="text-xs text-ink-muted">{TESTIMONIALS[active].role} · {TESTIMONIALS[active].year}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => handleDot(i)} aria-label={`Testimoni ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 interactive ${i === active ? "w-8 bg-ink" : "w-4 bg-border hover:bg-ink-muted"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PARTNERS — Marquee
   ══════════════════════════════════════════════════════════ */

function Partners() {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;
    animate(trackRef.current, { translateX: ["0%", "-50%"], duration: 25000, easing: "linear", loop: true });
  }, []);

  const names = ["Google", "Microsoft", "AWS", "GitHub", "Figma", "JetBrains", "Meta", "IBM", "Intel", "NVIDIA", "Oracle", "Cisco"];
  const doubled = [...names, ...names];

  return (
    <section className="py-20 border-y border-border overflow-hidden">
      <div className="section-inner mb-8"><div className="label">Mitra Terpercaya</div></div>
      <div className="overflow-hidden">
        <div ref={trackRef} className="marquee-track">
          {doubled.map((name, i) => (
            <div key={i} className="partner-item interactive">
              <span className="text-2xl lg:text-3xl font-semibold font-[family-name:var(--font-heading)] tracking-tight whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FAQ — Clean Accordion
   ══════════════════════════════════════════════════════════ */

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const answersRef = useRef([]);

  const toggle = (idx) => {
    const el = answersRef.current[idx];
    if (!el) return;
    if (openIdx === idx) {
      animate(el, { height: [el.scrollHeight, 0], duration: 400, easing: "easeInOutCubic" });
      setOpenIdx(null);
    } else {
      if (openIdx !== null) { const prev = answersRef.current[openIdx]; if (prev) animate(prev, { height: [prev.scrollHeight, 0], duration: 400, easing: "easeInOutCubic" }); }
      animate(el, { height: [0, el.scrollHeight], duration: 500, easing: "easeInOutCubic" });
      setOpenIdx(idx);
    }
  };

  return (
    <section id="faq" className="section-space overflow-hidden">
      <div className="section-inner">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <div className="label mb-4">FAQ</div>
            <h2 className="display-lg">Pertanyaan<br />umum</h2>
          </div>
          <div className="lg:col-span-8">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item border-t border-border ${openIdx === i ? "border-t-yellow/50" : ""} transition-colors`}>
                <button className="w-full flex items-center justify-between py-6 text-left group interactive" onClick={() => toggle(i)} aria-expanded={openIdx === i}>
                  <span className="font-semibold font-[family-name:var(--font-heading)] text-base pr-8 group-hover:text-yellow transition-colors">{faq.q}</span>
                  <span className={`text-xl text-ink-muted transition-transform duration-500 flex-shrink-0 ${openIdx === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <div ref={(el) => (answersRef.current[i] = el)} className="accordion-body">
                  <p className="body-md pb-6 pr-12">{faq.a}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FINAL CTA — Cinematic Ending
   ══════════════════════════════════════════════════════════ */

function FinalCTA() {
  return (
    <section id="cta" className="section-space section-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)" }} />

      <div className="section-inner relative z-10 text-center">
        <div className="label mb-8 !text-white/40">Bergabunglah</div>

        <div className="mb-10">
          <h2 className="display-xl mx-auto max-w-5xl" style={{ color: "#fafaf9" }}>
            <span className="block">Jadilah bagian dari</span>
            <span className="block">generasi berikutnya</span>
            <span className="block text-yellow">inovator digital</span>
          </h2>
        </div>

        <p className="body-lg mx-auto max-w-lg mb-12 !text-white/50">Perjalananmu di dunia teknologi dimulai di sini. Ambil langkah pertama menuju masa depan yang luar biasa.</p>

        <div>
          <a href="#" className="btn-editorial !bg-white !text-ink hover:!bg-yellow hover:!text-ink">
            Gabung HIMASANTIKA
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FOOTER — Premium Minimal
   ══════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer id="contact" className="section-dark pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border-dark" />
      <div className="section-inner">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <Image src="/icon.jpg" alt="HIMASANTIKA" width={32} height={32} className="rounded-lg object-cover" />
              <span className="text-sm font-semibold font-[family-name:var(--font-heading)]" style={{ color: "#fafaf9" }}>HIMASANTIKA</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(250,250,249,0.4)" }}>
              Himpunan Mahasiswa Informatika — Membentuk pemimpin teknologi masa depan melalui inovasi dan komunitas.
            </p>
          </div>

          <div>
            <h4 className="label mb-6">Navigasi</h4>
            {["Tentang", "Divisi", "Program", "Galeri", "FAQ"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm mb-3 transition-colors duration-300" style={{ color: "rgba(250,250,249,0.4)" }} onMouseEnter={(e) => e.target.style.color = "#fafaf9"} onMouseLeave={(e) => e.target.style.color = "rgba(250,250,249,0.4)"}>{l}</a>
            ))}
          </div>

          <div>
            <h4 className="label mb-6">Kontak</h4>
            <div className="space-y-3 text-sm" style={{ color: "rgba(250,250,249,0.4)" }}>
              <p>himasantika@university.ac.id</p>
              <p>+62 812-3456-7890</p>
              <p>Fakultas Ilmu Komputer<br />Gedung Universitas, Lantai 3</p>
            </div>
          </div>

          <div>
            <h4 className="label mb-6">Media Sosial</h4>
            {["GitHub", "Instagram", "LinkedIn", "Twitter"].map((s) => (
              <a key={s} href="#" className="block text-sm mb-3 transition-colors duration-300" style={{ color: "rgba(250,250,249,0.4)" }} onMouseEnter={(e) => e.target.style.color = "#fafaf9"} onMouseLeave={(e) => e.target.style.color = "rgba(250,250,249,0.4)"}>{s} ↗</a>
            ))}
          </div>
        </div>

        <div className="border-t border-border-dark pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(250,250,249,0.25)" }}>© {new Date().getFullYear()} HIMASANTIKA. Hak cipta dilindungi.</p>
          <div className="flex gap-6">
            {["Kebijakan Privasi", "Syarat & Ketentuan", "Kode Etik"].map((l) => (
              <a key={l} href="#" className="text-xs transition-colors" style={{ color: "rgba(250,250,249,0.25)" }} onMouseEnter={(e) => e.target.style.color = "rgba(250,250,249,0.5)"} onMouseLeave={(e) => e.target.style.color = "rgba(250,250,249,0.25)"}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE COMPOSITION
   ══════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <MouseFollower />
      <Navbar />
      <Hero />
      <About />
      <Why />
      <Divisions />
      <Programs />
      <Statistics />
      <Gallery />
      <Testimonials />
      <Partners />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
