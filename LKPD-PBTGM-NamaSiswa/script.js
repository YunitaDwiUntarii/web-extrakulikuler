(() => {
  'use strict';

  const form = document.getElementById('regForm');
  const head = document.getElementById('cardHead');
  const success = document.getElementById('success');
  const meter = document.getElementById('meter');
  const meterText = document.getElementById('meterText');

  // Data ekstrakurikuler SMK Negeri 1 Tengaran
  const KAT = { lead: 'Kepemimpinan &amp; Sosial', olahraga: 'Olahraga', seni: 'Seni &amp; Musik', akademik: 'Akademik &amp; Religi' };
  const EKSKUL = [
    {"n": "Paskibra", "v": "Paskibra", "k": "lead", "i": "🚩", "d": "Melatih baris-berbaris, kedisiplinan, dan kekompakan sebagai pasukan pengibar bendera.", "u": "Membentuk siswa yang disiplin, tegap, dan cinta tanah air, sekaligus menyiapkan pasukan pengibar bendera untuk upacara.", "g": ["Latihan baris-berbaris (PBB) dasar", "Latihan formasi dan teknik pengibaran bendera", "Latihan fisik untuk kebugaran dan ketahanan", "Bertugas pada upacara dan acara sekolah"], "c": "suka tantangan fisik, ingin lebih disiplin, dan bangga mengibarkan Merah Putih."},
    {"n": "Pramuka", "v": "Pramuka", "k": "lead", "i": "⚜️", "d": "Membentuk karakter disiplin, mandiri, dan peduli lewat kegiatan kepanduan di alam terbuka maupun sekolah.", "u": "Menumbuhkan karakter mandiri, tanggung jawab, dan jiwa kepemimpinan lewat kegiatan kepanduan.", "g": ["Tali-temali, sandi, dan semaphore", "Pionering dan keterampilan berkemah", "Kegiatan di alam terbuka seperti jelajah dan perkemahan", "Latihan memimpin regu dan kerja sama kelompok"], "c": "suka berpetualang, senang kegiatan di alam, dan ingin melatih kepemimpinan."},
    {"n": "PMR", "v": "PMR (Palang Merah Remaja)", "k": "lead", "i": "🩹", "d": "Belajar pertolongan pertama, kepedulian kesehatan, dan aksi kemanusiaan bersama relawan muda.", "u": "Membekali siswa dengan keterampilan pertolongan pertama dan kepedulian terhadap sesama.", "g": ["Belajar pertolongan pertama (P3K) dan penanganan luka", "Latihan membalut, memasang perban, dan menggunakan tandu", "Penyuluhan hidup bersih dan sehat", "Siaga pada kegiatan sekolah dan aksi sosial"], "c": "peduli sesama, tenang menghadapi situasi darurat, dan tertarik pada dunia kesehatan."},
    {"n": "Jepun", "v": "Jepun", "k": "akademik", "i": "🎌", "d": "Kenali bahasa dan budaya Jepang, dari huruf dan percakapan dasar hingga tradisi populer.", "u": "Mengenalkan bahasa dan budaya Jepang sebagai bekal wawasan dan peluang di dunia kerja global.", "g": ["Belajar huruf hiragana dan katakana", "Percakapan dasar dan salam sehari-hari", "Mengenal budaya Jepang: tradisi, makanan, dan seni", "Permainan dan kegiatan seru bertema Jepang"], "c": "suka anime, J-pop, dan budaya Jepang, atau ingin menambah kemampuan bahasa asing."},
    {"n": "Silat", "v": "Silat (Pencak Silat)", "k": "olahraga", "i": "🥋", "d": "Pelajari seni bela diri pencak silat sekaligus melatih mental, disiplin, dan sportivitas.", "u": "Melatih kemampuan bela diri khas Nusantara sekaligus membentuk mental yang tangguh dan sportif.", "g": ["Pemanasan, kuda-kuda, dan langkah dasar", "Teknik serangan, tangkisan, dan kuncian", "Latihan jurus dan pernapasan", "Persiapan pertandingan dan kenaikan tingkat"], "c": "ingin bisa menjaga diri, suka olahraga aktif, dan mau berlatih rutin."},
    {"n": "Foster", "v": "Foster", "k": "akademik", "i": "⭐", "d": "Wadah bagi siswa untuk mengembangkan minat, kemampuan, dan kebersamaan.", "u": "Wadah bagi siswa untuk mengembangkan minat, kemampuan, dan kebersamaan di luar jam pelajaran.", "g": ["Pertemuan dan latihan rutin bersama anggota", "Kegiatan kelompok dan proyek bersama", "Berpartisipasi dalam acara sekolah", "Belajar berorganisasi dan percaya diri"], "c": "ingin menambah teman dan pengalaman baru. Tanyakan detail kegiatannya langsung ke pembina."},
    {"n": "Voli", "v": "Voli", "k": "olahraga", "i": "🏐", "d": "Latih servis, smash, dan kekompakan dalam permainan beregu.", "u": "Mengembangkan kemampuan permainan bola voli sekaligus kerja sama tim.", "g": ["Latihan passing, servis, dan smash", "Latihan posisi dan strategi permainan", "Latihan fisik: loncat dan kelincahan", "Latih tanding dan persiapan turnamen"], "c": "suka olahraga beregu, semangat tinggi, dan ingin mencoba bertanding."},
    {"n": "Futsal", "v": "Futsal", "k": "olahraga", "i": "⚽", "d": "Asah teknik, kecepatan, dan strategi tim dalam permainan bola yang dinamis.", "u": "Mengasah teknik dan strategi futsal sambil membangun kekompakan dan sportivitas tim.", "g": ["Latihan dribel, passing, dan shooting", "Latihan skema dan formasi tim", "Latihan fisik dan kelincahan", "Latih tanding dan turnamen"], "c": "suka sepak bola, gesit, dan senang bermain dalam tim."},
    {"n": "Jurnalis", "v": "Jurnalis", "k": "akademik", "i": "📰", "d": "Berlatih menulis berita, meliput kegiatan, dan menyajikan informasi sekolah secara kreatif.", "u": "Melatih kemampuan menulis, meliput, dan menyampaikan informasi dengan benar dan menarik.", "g": ["Belajar menulis berita dan artikel", "Teknik wawancara dan peliputan acara sekolah", "Fotografi, desain, atau pengelolaan media sekolah", "Menerbitkan karya seperti mading atau konten digital"], "c": "suka menulis, penasaran, dan ingin tahu cara kerja media."},
    {"n": "MTQ", "v": "MTQ (Musabaqah Tilawatil Qur’an)", "k": "akademik", "i": "📖", "d": "Latih tilawah Al-Qur’an dengan tajwid dan lagu yang baik, serta siap berlomba.", "u": "Mengembangkan kemampuan membaca Al-Qur’an dengan tajwid dan lagu yang indah, serta menyiapkan peserta lomba.", "g": ["Latihan tilawah dan memperbaiki tajwid", "Belajar makhraj dan lagu (nagham)", "Latihan hafalan", "Persiapan lomba MTQ"], "c": "senang membaca Al-Qur’an, ingin memperbaiki bacaan, atau tertarik ikut lomba."},
    {"n": "Rebana", "v": "Rebana", "k": "seni", "i": "🎶", "d": "Lestarikan seni musik islami lewat tabuhan rebana dan lantunan selawat.", "u": "Melestarikan seni musik islami sekaligus melatih rasa irama dan kekompakan.", "g": ["Belajar dasar tabuhan dan ritme rebana", "Latihan melantunkan selawat", "Latihan kekompakan dalam kelompok", "Tampil pada peringatan hari besar Islam dan acara sekolah"], "c": "suka musik, tertarik seni islami, dan senang bermain bersama."},
    {"n": "Rohis", "v": "Rohis (Rohani Islam)", "k": "akademik", "i": "🌙", "d": "Perdalam wawasan keislaman, akhlak, dan kegiatan keagamaan bersama teman.", "u": "Memperdalam wawasan keislaman, menguatkan akhlak, dan mempererat persaudaraan antar siswa.", "g": ["Kajian keislaman rutin", "Praktik ibadah dan membaca Al-Qur’an bersama", "Peringatan hari besar Islam", "Kegiatan sosial dan dakwah di lingkungan sekolah"], "c": "ingin memperdalam ilmu agama dan mencari teman yang saling mendukung."},
    {"n": "Padus", "v": "Padus (Paduan Suara)", "k": "seni", "i": "🎤", "d": "Asah olah vokal, harmoni, dan kekompakan dalam paduan suara.", "u": "Melatih olah vokal dan harmoni suara, serta kepercayaan diri tampil bersama.", "g": ["Pemanasan vokal dan teknik pernapasan", "Belajar membaca not dan membagi suara", "Latihan lagu wajib dan lagu daerah", "Tampil di upacara, acara sekolah, atau lomba"], "c": "suka bernyanyi, ingin melatih suara, dan senang tampil bersama."},
    {"n": "Drumband", "v": "Drumband", "k": "seni", "i": "🥁", "d": "Padukan irama perkusi dan alat tiup dalam penampilan yang kompak.", "u": "Melatih kekompakan lewat permainan perkusi dan alat musik dalam formasi.", "g": ["Belajar memainkan snare, bass drum, dan alat melodi", "Latihan ritme dan aba-aba mayoret", "Latihan formasi sambil bermain musik", "Tampil di karnaval, upacara, dan acara sekolah"], "c": "suka musik, kompak dalam tim, dan ingin tampil di depan banyak orang."},
    {"n": "Tari", "v": "Tari", "k": "seni", "i": "💃", "d": "Ekspresikan diri lewat gerak, irama, dan penampilan tari.", "u": "Mengembangkan kreativitas, ekspresi, dan rasa percaya diri lewat gerak dan irama.", "g": ["Pemanasan, olah tubuh, dan kelenturan", "Belajar tari tradisional dan kreasi", "Latihan ekspresi dan koreografi", "Tampil di acara sekolah dan lomba"], "c": "suka menari, ingin lebih percaya diri, dan senang berkreasi."}
  ];
  const grid = document.getElementById('grid');
  const chips = document.getElementById('chips');

  function render(filter) {
    grid.innerHTML = EKSKUL.filter(e => filter === 'all' || e.k === filter).map((e, i) =>
      '<article class="eks" style="--i:' + i + '"><span class="ico" aria-hidden="true">' + e.i + '</span>' +
      '<span class="tag">' + KAT[e.k] + '</span><h3>' + e.n + '</h3><p>' + e.d + '</p>' +
      '<div class="acts"><button type="button" data-detail="' + EKSKUL.indexOf(e) + '">Lihat detail</button>' +
      '<button type="button" data-pilih="' + e.v + '">Daftar →</button></div></article>').join('');
  }
  chips.innerHTML = [['all', 'Semua']].concat(Object.entries(KAT)).map((p, i) =>
    '<button type="button" class="chip" data-k="' + p[0] + '" aria-pressed="' + (i === 0) + '">' + p[1] + '</button>').join('');
  chips.addEventListener('click', ev => {
    const b = ev.target.closest('.chip');
    if (!b) return;
    chips.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c === b));
    render(b.dataset.k);
  });
  function goToForm(value) {
    if (form.hidden) document.getElementById('again').click();
    form.elements.ekskul.value = value;
    validate('ekskul');
    document.getElementById('daftar').scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => form.elements.nama.focus({ preventScroll: true }), 700);
  }

  // Jendela detail ekstrakurikuler
  const dlg = document.getElementById('detail');
  let aktif = null;
  function bukaDetail(i) {
    const e = aktif = EKSKUL[i];
    document.getElementById('dIco').textContent = e.i;
    document.getElementById('dTag').innerHTML = KAT[e.k];
    document.getElementById('dTitle').textContent = e.n;
    document.getElementById('dUntuk').textContent = e.u;
    document.getElementById('dGiat').innerHTML = e.g.map(x => '<li>' + x + '</li>').join('');
    document.getElementById('dCocok').textContent = 'Cocok untuk kamu yang ' + e.c;
    dlg.showModal();
  }
  grid.addEventListener('click', ev => {
    const d = ev.target.closest('[data-detail]');
    if (d) return bukaDetail(+d.dataset.detail);
    const b = ev.target.closest('[data-pilih]');
    if (b) goToForm(b.dataset.pilih);
  });
  document.getElementById('dClose').addEventListener('click', () => dlg.close());
  document.getElementById('dDaftar').addEventListener('click', () => { dlg.close(); goToForm(aktif.v); });
  render('all');

  // Pola email baku (regex)
  const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

  // Aturan validasi: mengembalikan pesan error, atau string kosong jika valid
  const rules = {
    nama: v => !v.trim() ? 'Nama lengkap wajib diisi.'
      : v.trim().length < 3 ? 'Nama minimal 3 karakter.' : '',
    email: v => !v.trim() ? 'Email wajib diisi.'
      : !EMAIL_RE.test(v.trim()) ? 'Format email tidak valid (contoh: nama@email.com).' : '',
    password: v => !v ? 'Password wajib diisi.'
      : v.length < 8 ? 'Password minimal 8 karakter (' + v.length + '/8).' : '',
    konfirmasi: v => !v ? 'Konfirmasi password wajib diisi.'
      : v !== form.elements.password.value ? 'Konfirmasi password harus sama persis dengan password.' : '',
    ekskul: v => !v ? 'Silakan pilih salah satu ekstrakurikuler.' : ''
  };

  const names = Object.keys(rules);

  function validate(name) {
    const input = form.elements[name];
    const field = form.querySelector('[data-field="' + name + '"]');
    const error = rules[name](input.value);
    field.classList.toggle('invalid', !!error);
    field.classList.toggle('valid', !error);
    field.querySelector('.msg').textContent = error;
    input.setAttribute('aria-invalid', error ? 'true' : 'false');
    return !error;
  }

  function clearState(name) {
    const field = form.querySelector('[data-field="' + name + '"]');
    field.classList.remove('valid', 'invalid');
    field.querySelector('.msg').textContent = '';
    form.elements[name].removeAttribute('aria-invalid');
  }

  // Kekuatan password (0-4)
  function strength(v) {
    if (!v) return 0;
    if (v.length < 8) return 1;
    let s = 1;
    if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
    if (/\d/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return s;
  }
  function updateMeter() {
    const lvl = strength(form.elements.password.value);
    meter.dataset.level = lvl;
    meterText.textContent = lvl ? 'Kekuatan password: ' + ['', 'Lemah', 'Cukup', 'Baik', 'Kuat'][lvl] : '';
  }

  // Validasi real-time
  names.forEach(name => {
    const el = form.elements[name];
    el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => {
      validate(name);
      if (name === 'password') {
        updateMeter();
        if (form.elements.konfirmasi.value) validate('konfirmasi');
      }
    });
    el.addEventListener('blur', () => { if (el.value || el.closest('.invalid, .valid')) validate(name); });
  });

  // Tampil / sembunyikan password
  form.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = form.elements[btn.dataset.toggle];
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? 'Sembunyikan' : 'Lihat';
      btn.setAttribute('aria-pressed', show);
    });
  });

  // Submit: cegah reload, validasi semua kolom
  form.addEventListener('submit', event => {
    event.preventDefault();
    const results = names.map(validate);
    const firstBad = names.find((_, i) => !results[i]);
    if (firstBad) { form.elements[firstBad].focus(); return; }

    document.getElementById('sName').textContent = form.elements.nama.value.trim();
    document.getElementById('sEkskul').textContent = form.elements.ekskul.value;
    document.getElementById('sEmail').textContent = form.elements.email.value.trim();
    form.hidden = true;
    head.hidden = true;
    success.hidden = false;
    document.getElementById('successTitle').focus();
  });

  // Daftarkan anggota lain
  document.getElementById('again').addEventListener('click', () => {
    form.reset();
    names.forEach(clearState);
    updateMeter();
    form.querySelectorAll('[data-toggle]').forEach(b => { b.textContent = 'Lihat'; b.setAttribute('aria-pressed', 'false'); });
    success.hidden = true;
    form.hidden = false;
    head.hidden = false;
    form.elements.nama.focus();
  });
})();
