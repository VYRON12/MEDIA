/**
 * VYRON AI & DIGITAL STUDIO - Interactive Script
 * Handles: Pricing Calculator, Dynamic WhatsApp Message Generation, Lightbox, FAQs, Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Constants
  const WHATSAPP_PHONE = '201098021457';
  const FACEBOOK_URL = 'https://www.facebook.com/share/1DuUP39vz7/';

  /* ----------------------------------------------------
     1. Interactive Video Pricing Calculator
  ---------------------------------------------------- */
  const packageProRadio = document.getElementById('calc-package-pro');
  const packagePremiumRadio = document.getElementById('calc-package-premium');
  const durationSlider = document.getElementById('calc-duration-slider');
  const durationValueDisplay = document.getElementById('calc-duration-value');
  const addonVoiceover = document.getElementById('calc-addon-voice');
  const addonScript = document.getElementById('calc-addon-script');
  const addonFast = document.getElementById('calc-addon-fast');
  const addonThumbnail = document.getElementById('calc-addon-thumb');

  const basePriceDisplay = document.getElementById('calc-base-price');
  const discountRow = document.getElementById('calc-discount-row');
  const discountDisplay = document.getElementById('calc-discount-val');
  const totalPriceDisplay = document.getElementById('calc-total-price');
  const sendCalcWhatsAppBtn = document.getElementById('calc-send-whatsapp');

  function updateCalculator() {
    if (!durationSlider) return;

    const minutes = parseInt(durationSlider.value, 10);
    durationValueDisplay.textContent = minutes === 1 ? 'دقيقة واحدة' : (minutes === 2 ? 'دقيقتان' : `${minutes} دقائق`);

    const isPremium = packagePremiumRadio && packagePremiumRadio.checked;
    const ratePerMinute = isPremium ? 500 : 250;
    const packageName = isPremium ? 'باقة PREMIUM (500 ج/دقيقة)' : 'الباقة الاحترافية (250 ج/دقيقة)';

    let base = ratePerMinute * minutes;
    let addonsTotal = 0;
    let selectedAddonsList = [];

    if (addonScript && addonScript.checked) {
      addonsTotal += 100;
      selectedAddonsList.push('كتابة سكريبت تسويقي (+100 ج)');
    }
    if (addonVoiceover && addonVoiceover.checked) {
      addonsTotal += 150;
      selectedAddonsList.push('تعليق صوتي AI واقعي فائق الدقة (+150 ج)');
    }
    if (addonFast && addonFast.checked) {
      addonsTotal += 200;
      selectedAddonsList.push('تسليم فائق السرعة خلال 24-48 ساعة (+200 ج)');
    }
    if (addonThumbnail && addonThumbnail.checked) {
      selectedAddonsList.push('تصميم غلاف فيديو Thumbnail احترافي (هدية مجانية)');
    }

    const subtotal = base + addonsTotal;
    let discount = 0;

    // Apply 10% discount for videos of 3 minutes or more!
    if (minutes >= 3) {
      discount = Math.round(subtotal * 0.10);
      if (discountRow) discountRow.classList.remove('hidden');
      if (discountDisplay) discountDisplay.textContent = `-${discount} ج.م (خصم 10% للمدد الطويلة)`;
    } else {
      if (discountRow) discountRow.classList.add('hidden');
    }

    const finalTotal = subtotal - discount;

    if (basePriceDisplay) basePriceDisplay.textContent = `${subtotal.toLocaleString('ar-EG')} ج.م`;
    if (totalPriceDisplay) totalPriceDisplay.textContent = `${finalTotal.toLocaleString('ar-EG')} ج.م`;

    // Dynamic WhatsApp Link
    if (sendCalcWhatsAppBtn) {
      const addonsText = selectedAddonsList.length > 0 
        ? selectedAddonsList.join(' + ') 
        : 'بدون إضافات إضافية';

      const waMessage = 
`🎬 مرحباً أستاذ أمير / استوديو VYRON
قمت بحساب تكلفة الفيديو عبر حاسبة موقعكم وحابب أبدأ التنفيذ:

📌 الباقة: ${packageName}
⏱️ مدة الفيديو المطلوبة: ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}
✨ الإضافات: ${addonsText}
💰 الإجمالي التقديري بعد العرض: ${finalTotal} جنيه مصري

يرجى إرسال تفاصيل البدء بالعمل وكيفية إرسال فكرة مشروعي. شكراً لكم!`;

      sendCalcWhatsAppBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;
    }
  }

  // Calculator Event Listeners
  if (durationSlider) {
    durationSlider.addEventListener('input', updateCalculator);
    [packageProRadio, packagePremiumRadio, addonVoiceover, addonScript, addonFast, addonThumbnail].forEach(el => {
      if (el) el.addEventListener('change', updateCalculator);
    });
    // Initial calculation
    updateCalculator();
  }

  /* ----------------------------------------------------
     2. Custom WhatsApp Order Direct Generator Form
  ---------------------------------------------------- */
  const contactForm = document.getElementById('vyron-direct-order-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = document.getElementById('client-name').value.trim() || 'عميل محترم';
      const serviceType = document.getElementById('client-service').value;
      const clientBudget = document.getElementById('client-budget').value;
      const clientIdea = document.getElementById('client-idea').value.trim() || 'عندي فكرة مشروع وأريد مناقشة أفضل طريقة لتنفيذها بالفيديو والذكاء الاصطناعي.';

      const formattedMessage = 
`👋 السلام عليكم أستاذ أمير / استوديو VYRON
معاك: ${clientName}
حابب أبدأ مشروع جديد معاكم بالتفاصيل الآتية:

🎯 الخدمة المطلوبة: ${serviceType}
💼 الباقة / الميزانية التقريبية: ${clientBudget}
💡 نبذة عن الفكرة أو المنتج:
"${clientIdea}"

منتظر تواصلكم لمناقشة التفاصيل والبدء فوراً. شكراً لكم!`;

      const targetUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(targetUrl, '_blank');
    });
  }

  /* ----------------------------------------------------
     3. Package Direct WhatsApp Buttons
  ---------------------------------------------------- */
  document.querySelectorAll('[data-package-order]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pack = btn.getAttribute('data-package-order');
      let msg = '';

      if (pack === 'pro') {
        msg = 
`🎬 مرحباً أستاذ أمير / استوديو VYRON
حابب أطلب (الباقة الاحترافية - 250 جنيه للدقيقة) لإنشاء مونتاج وفيديو احترافي بالذكاء الاصطناعي لمشروعي.
عايز أعرف الخطوات والمدة لتجهيز أول معاينة. شكراً!`;
      } else if (pack === 'premium') {
        msg = 
`👑 مرحباً أستاذ أمير / استوديو VYRON
أريد حجز (باقة PREMIUM الفاخرة - 500 جنيه للدقيقة) بدقة 4K والمؤثرات البصرية والصوتية والهوك السينمائي مع اللوجو الخاص بي.
جاهز لعرض فكرتي والبدء في أسرع وقت!`;
      } else if (pack === 'social') {
        msg = 
`🚀 مرحباً أستاذ أمير / استوديو VYRON
مهتم بـ (باقة نمو السوشيال ميديا والتسويق المتكاملة) لزيادة المتابعين والمبيعات وإدارة الحسابات وتحسين الظهور على Google.
يرجى إرسال تفاصيل الخطة الشهرية والأسعار.`;
      } else {
        msg = 
`👋 مرحباً استوديو VYRON، حابب أستفسر عن خدمات إنتاج فيديوهات الذكاء الاصطناعي والتسويق الرقمي المتاحة لديكم.`;
      }

      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });

  /* ----------------------------------------------------
     4. FAQ Accordion Logic
  ---------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (trigger && answer) {
      trigger.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        // Close all others
        faqItems.forEach(other => {
          const otherAns = other.querySelector('.faq-answer');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherAns) otherAns.classList.add('hidden');
          if (otherIcon) {
            otherIcon.classList.remove('rotate-180', 'text-amber-400');
          }
        });

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) {
            icon.classList.add('rotate-180', 'text-amber-400');
          }
        }
      });
    }
  });

  /* ----------------------------------------------------
     5. Lightbox Modal for Posters & Visuals
  ---------------------------------------------------- */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('[data-lightbox-src]').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-lightbox-src');
      const caption = el.getAttribute('data-lightbox-caption') || '';
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      if (lightboxModal) lightboxModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.add('hidden');
      document.body.style.overflow = '';
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----------------------------------------------------
     6. Mobile Nav Toggle
  ---------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    const menuIcon = mobileMenuBtn.querySelector('i');
    mobileMenuBtn.addEventListener('click', () => {
      const isClosed = mobileMenu.classList.toggle('hidden');
      if (menuIcon) {
        if (!isClosed) {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-xmark');
        } else {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuIcon) {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      });
    });
  }

  /* ----------------------------------------------------
     7. Interactive Video Sample Tabs Filter
  ---------------------------------------------------- */
  const filterTabs = document.querySelectorAll('.sample-filter-btn');
  const sampleCards = document.querySelectorAll('.sample-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active-tab', 'bg-gradient-to-r', 'from-amber-500', 'to-amber-600', 'text-black', 'font-bold'));
      tab.classList.add('active-tab', 'bg-gradient-to-r', 'from-amber-500', 'to-amber-600', 'text-black', 'font-bold');

      const filter = tab.getAttribute('data-filter');
      sampleCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

});
