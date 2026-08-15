import React, { useState } from 'react';

interface LandingPageProps {
  onGoToSignup: () => void;
  onGoToSignin: () => void;
  onGoToPlans: () => void;
  onOpenDemoDashboard?: (role: 'student' | 'teacher' | 'school') => void;
  showToast: (msg: string) => void;
}

export default function LandingPage({
  onGoToSignup,
  onGoToSignin,
  onGoToPlans,
  onOpenDemoDashboard,
  showToast
}: LandingPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeModalKey, setActiveModalKey] = useState('courses');

  // Interactive chat state inside Rafiki modal
  const [rafikiChat, setRafikiChat] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: 'Habari Amina! What would you like to understand today?' },
    { sender: 'user', text: 'How do I solve 2x + 5 = 17?' },
    { sender: 'ai', text: 'Subtract 5 from both sides: 2x = 12. Then divide by 2, so x = 6.' }
  ]);
  const [chatText, setChatText] = useState('Explain quadratic equations');

  const resolveAction = (actionStr: string) => {
    const s = actionStr.toLowerCase();
    if (/sign in/.test(s)) return 'signin';
    if (/sign up|create account|start learning/.test(s)) return 'signup';
    if (/partner/.test(s)) return 'partner';
    if (/school/.test(s)) return 'schools';
    if (/subscription|plan|premium|manage/.test(s)) return 'subscribe';
    if (/course|enroll/.test(s)) return 'courses';
    if (/join/.test(s)) return 'join';
    if (/quiz/.test(s)) return 'quiz';
    if (/exam/.test(s)) return 'exams';
    if (/help/.test(s)) return 'help';
    if (/contact/.test(s)) return 'contact';
    if (/rafiki|ai tutor|ask ai/.test(s)) return 'rafiki';
    return 'courses';
  };

  const openDemo = (actionStr: string) => {
    const key = resolveAction(actionStr);
    
    if (key === 'signin') {
      onGoToSignin();
      return;
    }
    if (key === 'signup') {
      onGoToSignup();
      return;
    }
    if (key === 'subscribe') {
      onGoToPlans();
      return;
    }

    setActiveModalKey(key);
    setModalOpen(true);
  };

  const closeDemo = () => {
    setModalOpen(false);
  };

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    const msg = chatText;
    setRafikiChat(prev => [...prev, { sender: 'user', text: msg }]);
    setChatText('');
    setTimeout(() => {
      setRafikiChat(prev => [
        ...prev,
        { sender: 'ai', text: 'Great question. Rafiki AI would now create a clear, topic-by-topic explanation for you.' }
      ]);
    }, 400);
  };

  const getModalHeader = () => {
    switch (activeModalKey) {
      case 'partner': return { title: 'Partner with TESEA', sub: 'Build scalable, curriculum-aligned learning opportunities together.' };
      case 'schools': return { title: 'TESEA for Schools', sub: 'Request an institution demo tailored to your teachers and learners.' };
      case 'courses': return { title: 'Explore TESEA courses', sub: 'Choose a course and see the complete learning pathway.' };
      case 'join': return { title: 'Join TESEA Academy', sub: 'Tell us how you want to learn and we will set up your starter journey.' };
      case 'quiz': return { title: 'Start a Quiz', sub: 'Your adaptive quiz will be generated around today’s study goal.' };
      case 'exams': return { title: 'Explore Mock Exams', sub: 'Take a timed NECTA-style paper and receive an instant performance report.' };
      case 'help': return { title: 'Help Centre', sub: 'Quick answers for your TESEA learning experience.' };
      case 'contact': return { title: 'Contact TESEA Academy', sub: 'Our learner success team is ready to help.' };
      case 'rafiki': return { title: 'Chat with Rafiki AI', sub: 'Ask a question and get a step-by-step learning explanation.' };
      default: return { title: 'Explore TESEA', sub: 'A smarter way to learn.' };
    }
  };

  const modalInfo = getModalHeader();

  return (
    <div className="bg-[#f7f9fc] text-[#172538] font-sans">
      <style>{`
        :root{--ink:#172538;--muted:#617083;--line:#e5eaf0;--paper:#fbfcfe;--brand:#972e4b;--brand-dark:#701d35;--gold:#e8a33f;--navy:#153c5b;--mint:#dff4ed;--shadow:0 20px 50px rgba(24,42,62,.11)}
        *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:var(--paper);color:var(--ink);font-family:'DM Sans',system-ui,sans-serif;line-height:1.5} button,input{font:inherit} button{cursor:pointer;border:0}.shell{max-width:1220px;margin:auto;padding:0 28px}
        .announcement{background:#102d45;color:#eaf4f7;font-size:13px}.announcement .shell{height:38px;display:flex;align-items:center;justify-content:center;gap:11px}.announcement strong{color:#fff}.dot{width:6px;height:6px;border-radius:50%;background:#f2ba57}
        nav{height:76px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;position:sticky;top:0;z-index:20}.navin{display:flex;align-items:center;gap:30px;width:100%}.brand{display:flex;align-items:center;min-width:196px;text-decoration:none}.brand img{width:172px;height:auto;display:block}.links{display:flex;gap:23px;align-items:center;flex:1}.links a,.text-link{font-size:14px;font-weight:600;color:#405064;text-decoration:none;cursor:pointer}.links a:hover,.text-link:hover{color:var(--brand)}.nav-actions{display:flex;gap:10px;align-items:center}.btn{border-radius:7px;font-weight:700;padding:12px 18px;transition:.2s ease;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;cursor:pointer}.btn:hover{transform:translateY(-2px);box-shadow:0 10px 20px rgba(112,29,53,.15)}.btn-primary{background:var(--brand);color:#fff}.btn-outline{color:var(--brand);background:#fff;border:1px solid #d598a9}.btn-dark{color:#fff;background:var(--navy)}.btn-light{background:#fff;color:var(--ink)}
        .hero{position:relative;overflow:hidden;background:linear-gradient(117deg,#f6f2ee 0%,#fff 55%,#f3f9f9 100%);padding:78px 0 65px}.hero:after{content:'';position:absolute;width:520px;height:520px;border-radius:50%;border:80px solid rgba(151,46,75,.055);right:-175px;top:-270px}.hero-grid{display:grid;grid-template-columns:1.02fr .98fr;gap:65px;align-items:center;position:relative;z-index:1}.eyebrow{display:flex;align-items:center;gap:10px;color:var(--brand);font-size:12px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase}.eyebrow:before{content:'';width:28px;height:2px;background:var(--brand)}h1{font-family:'Playfair Display',serif;font-weight:700;letter-spacing:-1.5px;line-height:1.03;font-size:clamp(42px,5vw,66px);margin:17px 0 20px;max-width:630px}.accent{color:var(--brand)}.hero-copy{font-size:18px;max-width:550px;color:#536275;margin:0 0 30px}.hero-actions{display:flex;flex-wrap:wrap;gap:12px}.supporting{display:flex;align-items:center;gap:15px;margin-top:27px;color:#5b6a7d;font-size:13px;font-weight:600}.faces{display:flex}.face{width:28px;height:28px;border-radius:50%;border:2px solid #fff;margin-left:-7px;background:linear-gradient(135deg,#dfa887,#6c382b)}.face:nth-child(2){background:linear-gradient(135deg,#222,#c2a07f)}.face:nth-child(3){background:linear-gradient(135deg,#ca9d54,#574239)}.face:nth-child(4){background:var(--brand);display:grid;place-items:center;color:white;font-size:10px}.visual{position:relative;min-height:420px}.study-card{position:absolute;right:8%;top:5px;width:390px;max-width:90%;background:#fff;border:1px solid #e1e8ec;border-radius:17px;overflow:hidden;box-shadow:var(--shadow);padding:0 0 21px}.study-image{height:184px;background:linear-gradient(125deg,#173c58,#0c7d81);position:relative;overflow:hidden}.study-image:before{content:'';position:absolute;width:250px;height:250px;border:30px solid rgba(255,255,255,.13);border-radius:50%;right:-80px;top:-90px}.study-image:after{content:'x² + y²';position:absolute;color:rgba(255,255,255,.5);font-family:serif;font-size:44px;left:30px;top:56px;transform:rotate(-8deg)}.play{position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);display:grid;place-items:center;width:54px;height:54px;border-radius:50%;background:#fff;color:var(--brand);box-shadow:0 6px 22px rgba(0,0,0,.15);font-size:18px;padding-left:4px}.study-body{padding:18px 20px 0}.tag{display:inline-flex;border-radius:20px;padding:4px 9px;background:#fcecf0;color:var(--brand);font-size:11px;font-weight:800}.study-title{font-size:18px;font-weight:800;margin:11px 0 7px}.study-meta{font-size:12px;color:#708093}.study-progress{height:7px;border-radius:10px;background:#edf0f2;margin:18px 0 8px;overflow:hidden}.study-progress b{display:block;width:66%;height:100%;background:var(--gold)}.study-footer{display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:#627184}.float{position:absolute;background:#fff;border:1px solid #e8edf0;border-radius:12px;padding:14px;box-shadow:0 13px 30px rgba(24,42,62,.10)}.float-a{left:0;bottom:20px;width:184px}.float-b{right:0;bottom:1px;width:162px}.float b{display:block;font-size:20px}.float span{font-size:12px;color:#657589}.trophy{font-size:22px;float:left;margin-right:9px}.mini-bar{height:5px;background:#eee;border-radius:8px;margin-top:9px}.mini-bar i{display:block;height:100%;background:#40a782;border-radius:8px;width:78%}
        .stats{background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.stats-grid{display:grid;grid-template-columns:repeat(4,1fr)}.stat{padding:25px 27px;border-right:1px solid var(--line)}.stat:last-child{border:0}.stat strong{font-family:'Playfair Display',serif;font-size:28px;display:block}.stat span{color:#6d7b8d;font-size:13px}.stat .up{color:#16815e;font-weight:800;font-size:11px;margin-left:4px}
        section{padding:82px 0}.section-top{display:flex;justify-content:space-between;align-items:end;gap:25px;margin-bottom:30px}.section-top h2{font:700 clamp(29px,3.5vw,42px)/1.1 'Playfair Display',serif;letter-spacing:-.7px;margin:10px 0 0}.section-top p{max-width:450px;margin:0;color:var(--muted);font-size:15px}.course-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.course{background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;transition:.2s}.course:hover{transform:translateY(-5px);box-shadow:var(--shadow)}.course-cover{height:148px;padding:17px;color:#fff;display:flex;align-items:flex-end;font-weight:800;font-size:20px;position:relative;overflow:hidden}.course-cover:after{content:'';position:absolute;width:150px;height:150px;border:18px solid rgba(255,255,255,.15);border-radius:50%;right:-50px;top:-55px}.cover-1{background:linear-gradient(135deg,#153f5d,#1f8291)}.cover-2{background:linear-gradient(135deg,#8b2b48,#d07464)}.cover-3{background:linear-gradient(135deg,#826023,#d49c3b)}.course-content{padding:17px}.course-label{font-size:11px;text-transform:uppercase;letter-spacing:.8px;font-weight:800;color:var(--brand)}.course h3{font-size:17px;margin:8px 0 10px;line-height:1.25}.course-info{color:#748093;font-size:12px;display:flex;gap:12px}.course-footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);margin-top:15px;padding-top:13px;font-size:12px;font-weight:700}.rating{color:#d38a17}.arrow{color:var(--brand);font-size:19px;text-decoration:none}
        .learning{background:#102e46;color:white;position:relative;overflow:hidden}.learning:before{content:'';position:absolute;background:#1e5266;width:580px;height:580px;border-radius:50%;right:-220px;top:-380px}.learning-grid{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}.learning h2{font:700 clamp(32px,4vw,46px)/1.1 'Playfair Display',serif;margin:14px 0 18px}.learning p{color:#c6d6df;max-width:520px}.check-list{padding:0;margin:28px 0;list-style:none;display:grid;gap:12px}.check-list li:before{content:'✓';color:#f1bb50;margin-right:10px;font-weight:900}.toolbox{display:grid;grid-template-columns:repeat(2,1fr);gap:13px}.tool{border:1px solid rgba(255,255,255,.17);background:rgba(255,255,255,.06);border-radius:12px;padding:17px}.tool-icon{display:grid;place-items:center;width:36px;height:36px;background:rgba(242,185,79,.16);color:#f4c05b;border-radius:9px;font-weight:800;margin-bottom:21px}.tool b{display:block;font-size:15px}.tool span{color:#b9cad4;font-size:12px}
        .path-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.path{background:#fff;border:1px solid var(--line);border-radius:13px;padding:23px;min-height:220px}.path-num{font:700 13px 'DM Sans',sans-serif;color:var(--brand);border-bottom:1px solid var(--line);padding-bottom:14px}.path h3{font:700 21px 'Playfair Display',serif;margin:22px 0 9px}.path p{margin:0;color:var(--muted);font-size:14px}.path a{display:inline-block;color:var(--brand);font-size:13px;font-weight:800;text-decoration:none;margin-top:20px;cursor:pointer}
        .promo{padding:0 0 82px}.promo-box{background:linear-gradient(105deg,#972e4b,#6e1e36);color:#fff;border-radius:18px;padding:47px 54px;display:flex;justify-content:space-between;gap:35px;align-items:center;overflow:hidden;position:relative}.promo-box:after{content:'TESEA';position:absolute;right:-20px;bottom:-68px;font:bold 145px 'Playfair Display',serif;color:rgba(255,255,255,.07)}.promo h2{font:700 38px/1.12 'Playfair Display',serif;margin:0 0 12px;position:relative;z-index:1}.promo p{color:#f5dfe5;margin:0;position:relative;z-index:1}.promo .btn{position:relative;z-index:1;white-space:nowrap}
        footer{background:#0c2032;color:#c2d1d9;padding:52px 0 25px}.footer-grid{display:grid;grid-template-columns:1.7fr repeat(3,1fr);gap:35px}.footer-logo{filter:brightness(0) invert(1);width:180px;background:#fff;border-radius:4px;padding:5px}.footer-intro{font-size:13px;max-width:300px;margin-top:16px}.footer-title{color:#fff;font-size:13px;font-weight:800;margin-bottom:14px}.footer-grid a{display:block;color:#b7c5ce;text-decoration:none;font-size:13px;margin:8px 0;cursor:pointer}.copyright{border-top:1px solid rgba(255,255,255,.12);margin-top:38px;padding-top:20px;font-size:12px;display:flex;justify-content:space-between}.toast{position:fixed;right:22px;bottom:22px;z-index:30;background:#102e46;color:#fff;border-radius:10px;padding:14px 18px;box-shadow:var(--shadow);font-size:14px;transform:translateY(100px);opacity:0;transition:.28s}.toast.show{transform:translateY(0);opacity:1}
        @media(max-width:860px){.links{display:none}.navin{justify-content:space-between}.hero-grid,.learning-grid{grid-template-columns:1fr;gap:38px}.visual{min-height:380px}.course-grid,.path-grid{grid-template-columns:1fr 1fr}.stats-grid{grid-template-columns:1fr 1fr}.stat:nth-child(2){border-right:0}.stat:nth-child(-n+2){border-bottom:1px solid var(--line)}.footer-grid{grid-template-columns:1.6fr 1fr 1fr}.footer-grid>div:last-child{display:none}}
        @media(max-width:560px){.shell{padding:0 18px}.announcement .shell{font-size:11px}.nav-actions .text-link{display:none}.brand{min-width:0}.brand img{width:147px}.btn{padding:11px 14px}.hero{padding:54px 0}.hero-copy{font-size:16px}.visual{min-height:340px}.study-card{right:0}.float-a{left:0;bottom:3px}.float-b{display:none}.section-top{display:block}.section-top p{margin-top:14px}.course-grid,.path-grid{grid-template-columns:1fr}.course-grid .course:nth-child(3){display:none}section{padding:60px 0}.toolbox{grid-template-columns:1fr 1fr}.promo-box{padding:34px 25px;display:block}.promo h2{font-size:30px}.promo .btn{margin-top:22px}.footer-grid{grid-template-columns:1fr 1fr}.footer-grid>div:first-child{grid-column:span 2}.copyright{display:block}.copyright span+span{display:block;margin-top:6px}}
        
        /* Elevated product layer */
        :root{--electric:#2563eb;--surface:#f7f9fc;--blue-ink:#0b1f33;--glow:0 32px 80px rgba(16,38,67,.16)}
        body{background:var(--surface)}
        .announcement{background:linear-gradient(90deg,#091e32,#133d5c 62%,#0f704f)}
        nav{height:82px;background:rgba(255,255,255,.92);backdrop-filter:blur(18px)}
        .links a{padding:9px 0;position:relative}.links a:after{content:'';position:absolute;left:0;bottom:3px;width:0;height:2px;background:var(--brand);transition:.2s}.links a:hover:after{width:100%}
        .btn{border-radius:10px}.btn-primary{background:linear-gradient(135deg,#a72f52,#7e203d);box-shadow:0 9px 19px rgba(151,46,75,.19)}.btn-outline{border-color:#dde3ea;color:var(--blue-ink)}
        .hero{padding:94px 0 84px;background:radial-gradient(circle at 82% 12%,#f5e5ea 0,rgba(245,229,234,0) 26%),radial-gradient(circle at 6% 100%,#f8e9db 0,rgba(248,233,219,0) 32%),#f8fafc;color:#172538!important}.hero:after{border-width:1px;width:700px;height:700px;right:-300px;top:-300px;border-color:rgba(151,46,75,.16)}.hero:before{content:'TESEA';position:absolute;right:7%;bottom:-23px;font:700 150px/1 'Playfair Display',serif;letter-spacing:-11px;color:rgba(151,46,75,.035);pointer-events:none}
        .hero h1{font-size:clamp(48px,5.5vw,74px);letter-spacing:-2.8px;max-width:680px;color:#172538!important}.hero h1 .accent{color:#972e4b!important}.hero-copy,.hero p{font-size:18px;line-height:1.65;color:#536275!important}.eyebrow{letter-spacing:1.5px;color:#972e4b!important}.visual{min-height:470px}.study-card{right:0;width:430px;border-radius:20px;border-color:rgba(218,228,233,.9);padding-bottom:22px;box-shadow:var(--glow)}
        .study-image{height:204px;background:linear-gradient(118deg,#092238,#174d72 58%,#1a8a86)}.study-image:after{content:'2x + 5 = 17';font-family:'DM Sans',sans-serif;font-weight:700;font-size:30px;letter-spacing:1px;top:69px;left:32px}.study-image:before{width:310px;height:310px;border-width:42px}.play{width:62px;height:62px;color:#fff;background:linear-gradient(135deg,#b63c5e,#861f42)}.study-body{padding:20px 22px 0}.study-title{font-size:20px}.tag{background:#edf4fb;color:#1a5d83}.float{border-radius:14px;box-shadow:0 17px 42px rgba(11,31,51,.15)}.float-a{left:-21px;bottom:35px}.float-b{right:-29px;bottom:4px}.supporting{padding:11px 14px;background:#fff;border:1px solid #e7eaee;border-radius:12px;width:max-content}
        .stats{position:relative;margin-top:-1px}.stat{padding:30px 28px}.stat strong{font-size:31px}.stat:hover{background:#faf7f8}.stat span{font-size:13px}
        section{padding:100px 0}.section-top h2{font-size:clamp(34px,3.8vw,48px);letter-spacing:-1.2px}.course-grid{gap:24px}.course{border-radius:16px;box-shadow:0 6px 18px rgba(32,54,72,.035)}.course-cover{height:180px;font-size:23px;padding:23px}.course-cover:before{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(4,18,32,.22),transparent 65%)}.course h3{font-size:18px}.course-content{padding:20px}.course-footer{padding-top:15px}.course .arrow{width:31px;height:31px;display:grid;place-items:center;border-radius:50%;background:#f8e9ee}
        .learning{background:linear-gradient(122deg,#092137,#123d58 62%,#116b69)}.learning:after{content:'';position:absolute;width:260px;height:260px;border:1px solid rgba(255,255,255,.15);border-radius:50%;bottom:-160px;left:29%}.learning-grid{z-index:1}.tool{border-radius:15px;padding:21px;transition:.2s}.tool:hover{transform:translateY(-4px);background:rgba(255,255,255,.11)}.tool-icon{width:42px;height:42px;font-size:14px}.path{border-radius:16px;padding:29px;position:relative;overflow:hidden;transition:.22s}.path:after{content:'';position:absolute;width:130px;height:130px;border:1px solid #edf0f3;border-radius:50%;right:-55px;bottom:-55px}.path:hover{transform:translateY(-5px);box-shadow:var(--shadow);border-color:transparent}.path h3{font-size:23px}.promo-box{border-radius:22px;padding:57px 62px;background:radial-gradient(circle at 86% 20%,rgba(238,169,61,.3),transparent 18%),linear-gradient(110deg,#a43153,#741b39)}.promo h2{font-size:43px}.footer-logo{filter:none;width:175px;padding:3px;background:#fff;border-radius:4px}.toast{border-left:4px solid #e8a33f}
        .quick-actions{background:#fff;border-bottom:1px solid var(--line)}.quick-actions .shell{display:grid;grid-template-columns:repeat(4,1fr);gap:0}.quick-action{display:flex;align-items:center;gap:13px;padding:18px 16px;text-decoration:none;border-right:1px solid var(--line);color:var(--ink);transition:.2s;cursor:pointer}.quick-action:first-child{padding-left:0}.quick-action:last-child{border:0}.quick-action:hover{background:#fafbfd;color:var(--brand)}.quick-icon{width:36px;height:36px;display:grid;place-items:center;border-radius:10px;background:#f9e9ed;color:var(--brand);font-weight:800}.quick-action b{display:block;font-size:13px}.quick-action span{color:var(--muted);font-size:11px}.brand-promise{color:#a12f4e!important;font-size:11px!important;font-weight:800!important;letter-spacing:.3px}
        @media(max-width:860px){.quick-actions .shell{grid-template-columns:1fr 1fr}.quick-action:nth-child(2){border-right:0}.quick-action:nth-child(-n+2){border-bottom:1px solid var(--line)}.quick-action:first-child{padding-left:16px}.visual{min-height:420px}}
        @media(max-width:560px){nav{height:71px}.hero{padding:62px 0}.hero h1{font-size:48px}.study-card{width:100%}.quick-actions .shell{grid-template-columns:1fr}.quick-action,.quick-action:nth-child(2){border-right:0;border-bottom:1px solid var(--line)}.quick-action:last-child{border-bottom:0}.float-a{left:-6px}.promo-box{padding:39px 28px}.promo h2{font-size:34px}}
        .course-cover:before{content:'TESEA ACADEMY';position:absolute;right:18px;top:17px;font:700 9px 'DM Sans',sans-serif;letter-spacing:1.3px;color:rgba(255,255,255,.78);padding:5px 8px;border:1px solid rgba(255,255,255,.36);border-radius:99px;background:rgba(9,28,43,.08)}
        .modal-backdrop{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(5,19,32,.63);backdrop-filter:blur(7px);opacity:0;visibility:hidden;transition:.24s}.modal-backdrop.open{opacity:1;visibility:visible}.feature-modal{width:min(630px,100%);max-height:min(700px,calc(100vh - 40px));overflow:auto;background:#fff;border-radius:21px;box-shadow:0 30px 100px rgba(0,0,0,.3);transform:translateY(18px) scale(.985);transition:.24s}.modal-backdrop.open .feature-modal{transform:translateY(0) scale(1)}.modal-header{padding:25px 28px 20px;background:linear-gradient(128deg,#08263d,#123f5d 62%,#8f2948);color:#fff;position:relative;overflow:hidden}.modal-header:after{content:'TESEA';position:absolute;right:-9px;bottom:-39px;font:700 88px 'Playfair Display',serif;color:rgba(255,255,255,.08)}.modal-close{position:absolute;right:16px;top:15px;z-index:2;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);color:#fff;font-size:19px;border:0;cursor:pointer}.modal-kicker{font-size:11px;letter-spacing:1.3px;font-weight:800;color:#f4c05b}.modal-title{font:700 31px/1.1 'Playfair Display',serif;margin:9px 38px 5px 0;position:relative;z-index:1}.modal-subtitle{color:#d7e4ec;font-size:14px;position:relative;z-index:1;margin:0}.modal-body{padding:24px 28px 27px}.demo-note{display:flex;gap:10px;align-items:flex-start;border-radius:10px;background:#f8edf0;color:#703047;font-size:12px;padding:11px 13px;margin-bottom:20px}.demo-note b{white-space:nowrap}.feature-list{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:0 0 21px;padding:0;list-style:none}.feature-list li{border:1px solid #e7ebef;border-radius:10px;padding:11px 10px;font-size:13px;font-weight:700;color:#33465a}.feature-list li:before{content:'✓';display:inline-grid;place-items:center;margin-right:8px;width:18px;height:18px;border-radius:50%;background:#e7f3ef;color:#16815e;font-size:11px}.demo-panel{border:1px solid #e2e8ec;border-radius:13px;background:#fbfcfd;padding:15px;display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center}.demo-panel span{font-size:12px;color:#6b7b8e;display:block}.demo-panel b{font-size:14px}.demo-value{font-size:21px!important;color:#942d4b!important;font-weight:800}.modal-actions{display:flex;gap:10px;margin-top:22px}.modal-actions .btn{flex:1}.modal-actions .btn-outline{background:#fff}.modal-input,.modal-select,.modal-textarea{width:100%;padding:12px 13px;border:1px solid #dce4e9;border-radius:9px;margin-top:10px;background:#fff}.modal-textarea{min-height:77px;resize:vertical}.modal-input:focus,.modal-select:focus,.modal-textarea:focus{outline:2px solid rgba(151,46,75,.18);border-color:#a83250}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.form-label{font-size:11px;color:#5b6c7d;font-weight:800;letter-spacing:.4px;display:block;margin-top:13px}.form-note{font-size:11px;color:#718092;margin-top:12px}.plan-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.plan{border:1px solid #e0e6ea;border-radius:12px;padding:13px;position:relative}.plan.hot{border:2px solid #9c2e4d;background:#fff8fa}.plan-badge{position:absolute;top:-10px;right:8px;background:#9c2e4d;color:#fff;border-radius:20px;padding:3px 7px;font-size:9px;font-weight:800}.plan b{display:block;font-size:13px}.plan strong{display:block;font-size:20px;margin:8px 0;color:#142d42}.plan span{font-size:10px;color:#68798a}.faq{border:1px solid #e1e7eb;border-radius:10px;padding:13px;margin-bottom:8px}.faq b{font-size:13px}.faq p{font-size:12px;color:#617185;margin:7px 0 0}.chat{background:#f6f8fa;border:1px solid #e3e9ec;border-radius:13px;padding:13px}.bubble{max-width:84%;padding:10px 12px;border-radius:12px;font-size:13px;margin:7px 0}.bubble.ai{background:#e9f0f4;color:#1c3447;border-bottom-left-radius:3px}.bubble.user{background:#9c2e4d;color:#fff;margin-left:auto;border-bottom-right-radius:3px}.chat-input{display:flex;gap:7px;margin-top:11px}.chat-input .modal-input{margin:0}.chat-input button{min-width:43px}.course-table{width:100%;border-collapse:collapse;font-size:12px}.course-table td{border-bottom:1px solid #e8edf0;padding:10px 3px}.course-table td:last-child{text-align:right;color:#9c2e4d;font-weight:800}@media(max-width:520px){.modal-header,.modal-body{padding-left:20px;padding-right:20px}.modal-title{font-size:27px}.feature-list,.form-grid{grid-template-columns:1fr}.demo-panel{grid-template-columns:1fr}.modal-actions{flex-direction:column}.plan-grid{grid-template-columns:1fr}}
      `}</style>

      {/* Announcement Bar */}
      <div className="announcement">
        <div className="shell">
          <span className="dot" />
          <span><strong>TESEA Academy • NECTA 2026 Exam Prep:</strong> live revision classes are now open for Form 2, Form 4 & Form 6.</span>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <div className="shell navin">
          <a className="brand" href="#home">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#972e4b] text-white grid place-items-center font-bold text-base">✦</span>
              <div className="flex flex-col text-left">
                <span className="font-serif font-bold text-slate-900 text-base leading-none">TESEA</span>
                <span className="text-[9px] text-[#972e4b] font-bold tracking-widest uppercase">ACADEMY</span>
              </div>
            </div>
          </a>
          <div className="links">
            <a href="#courses" onClick={(e) => { e.preventDefault(); openDemo('Explore courses'); }}>Explore courses</a>
            <a href="#learning" onClick={(e) => { e.preventDefault(); openDemo('How it works'); }}>How it works</a>
            <a href="#exams" onClick={(e) => { e.preventDefault(); openDemo('Exams & quizzes'); }}>Exams & quizzes</a>
            <a href="#schools" onClick={(e) => { e.preventDefault(); openDemo('For schools'); }}>For schools</a>
          </div>
          <div className="nav-actions">
            <a className="text-link" onClick={(e) => { e.preventDefault(); onGoToSignin(); }}>Sign in</a>
            <a className="btn btn-primary" onClick={(e) => { e.preventDefault(); onGoToSignup(); }}>Sign up free</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main id="home">
        <section className="hero">
          <div className="shell hero-grid">
            <div>
              <div className="eyebrow">The TESEA learning experience</div>
              <h1>Learn today. Lead <span className="accent">tomorrow.</span></h1>
              <p className="hero-copy">A complete TESEA Academy learning space for NECTA, Cambridge and lifelong learners—expert-led lessons, practice tools, assessments and Rafiki AI, all in one focused experience.</p>
              <div className="hero-actions">
                <a onClick={(e) => { e.preventDefault(); onGoToSignup(); }} className="btn btn-primary" style={{ cursor: 'pointer' }}>Start learning free <span>→</span></a>
                <a onClick={(e) => { e.preventDefault(); openDemo('Explore courses'); }} className="btn btn-outline" style={{ cursor: 'pointer' }}>Explore TESEA courses</a>
              </div>
              <div className="supporting">
                <div className="faces">
                  <i className="face" />
                  <i className="face" />
                  <i className="face" />
                  <i className="face">4k+</i>
                </div>
                <span><b className="brand-promise">Learn Today. Learn Tomorrow.</b> &nbsp; Trusted by learners across Tanzania</span>
              </div>
            </div>

            <div className="visual">
              <div className="study-card">
                <div className="study-image">
                  <span className="play">▶</span>
                </div>
                <div className="study-body">
                  <span className="tag">TESEA • FORM 4 MATHEMATICS</span>
                  <div className="study-title">Mastering Quadratic Equations</div>
                  <div className="study-meta">12 lessons · Practice quiz included</div>
                  <div className="study-progress"><b /></div>
                  <div className="study-footer">
                    <span>66% complete</span>
                    <span>8 min left</span>
                  </div>
                </div>
              </div>
              <div className="float float-a">
                <span className="trophy">🏆</span>
                <b>TESEA Top 10%</b>
                <span>Weekly learning streak</span>
              </div>
              <div className="float float-b">
                <b>+42%</b>
                <span>Average practice score</span>
                <div className="mini-bar"><i /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats">
          <div className="shell stats-grid">
            <div className="stat">
              <strong>27<span className="up">+</span></strong>
              <span>NECTA subjects covered</span>
            </div>
            <div className="stat">
              <strong>1,500<span className="up">+</span></strong>
              <span>Lessons and study resources</span>
            </div>
            <div className="stat">
              <strong>50k<span className="up">+</span></strong>
              <span>Practice questions</span>
            </div>
            <div className="stat">
              <strong>24/7</strong>
              <span>Rafiki AI learning support</span>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="shell">
            <a className="quick-action" onClick={(e) => { e.preventDefault(); openDemo('Open mock exams'); }}>
              <div className="quick-icon">↗</div>
              <div><b>Mock exams</b><span>Timed, exam-style practice</span></div>
            </a>
            <a className="quick-action" onClick={(e) => { e.preventDefault(); openDemo('Open Quiz Studio'); }}>
              <div className="quick-icon">✓</div>
              <div><b>Quiz studio</b><span>Turn practice into progress</span></div>
            </a>
            <a className="quick-action" onClick={(e) => { e.preventDefault(); openDemo('Ask Rafiki AI'); }}>
              <div className="quick-icon">AI</div>
              <div><b>Ask Rafiki AI</b><span>Explain any hard concept</span></div>
            </a>
            <a className="quick-action" onClick={(e) => { e.preventDefault(); onGoToPlans(); }}>
              <div className="quick-icon">★</div>
              <div><b>Unlock premium</b><span>Learn without limits</span></div>
            </a>
          </div>
        </div>

        {/* Featured Courses */}
        <section id="courses">
          <div className="shell">
            <div className="section-top">
              <div>
                <div className="eyebrow">Featured learning</div>
                <h2>Build confidence, one lesson at a time.</h2>
              </div>
              <p>Designed around the way you learn best: watch, read, practice, ask questions and measure your growth.</p>
            </div>
            <div className="course-grid">
              <article className="course">
                <div className="course-cover cover-1">Biology: Cell to System</div>
                <div className="course-content">
                  <span className="course-label">Form 4 · Biology</span>
                  <h3>Complete your biology revision with clarity.</h3>
                  <div className="course-info"><span>18 lessons</span><span>•</span><span>3h 45m</span></div>
                  <div className="course-footer">
                    <span className="rating">★★★★★ <b>4.9</b></span>
                    <a className="arrow" onClick={(e) => { e.preventDefault(); onGoToSignup(); }}>→</a>
                  </div>
                </div>
              </article>
              <article className="course">
                <div className="course-cover cover-2">English for Impact</div>
                <div className="course-content">
                  <span className="course-label">Form 2 · English</span>
                  <h3>Write, speak and understand with confidence.</h3>
                  <div className="course-info"><span>14 lessons</span><span>•</span><span>2h 30m</span></div>
                  <div className="course-footer">
                    <span className="rating">★★★★★ <b>4.8</b></span>
                    <a className="arrow" onClick={(e) => { e.preventDefault(); onGoToSignup(); }}>→</a>
                  </div>
                </div>
              </article>
              <article className="course">
                <div className="course-cover cover-3">Financial Foundations</div>
                <div className="course-content">
                  <span className="course-label">Life skills · New</span>
                  <h3>Learn the money skills that move you forward.</h3>
                  <div className="course-info"><span>10 lessons</span><span>•</span><span>1h 55m</span></div>
                  <div className="course-footer">
                    <span className="rating">★★★★★ <b>4.9</b></span>
                    <a className="arrow" onClick={(e) => { e.preventDefault(); onGoToSignup(); }}>→</a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* How it Works / Learning */}
        <section className="learning" id="learning">
          <div className="shell learning-grid">
            <div>
              <div className="eyebrow" style={{ color: '#f4c05b' }}>More than a course library</div>
              <h2>Everything you need to make learning stick.</h2>
              <p>TESEA turns every study session into meaningful progress with a seamless, personalized learning flow.</p>
              <ul className="check-list">
                <li>Learn from clear video, audio and document lessons</li>
                <li>Practise with quizzes, puzzles and past papers</li>
                <li>Ask Rafiki AI for support whenever you get stuck</li>
              </ul>
              <a className="btn btn-light" onClick={(e) => { e.preventDefault(); onGoToSignup(); }}>Join TESEA Academy</a>
            </div>
            <div className="toolbox">
              <div className="tool"><div className="tool-icon">▶</div><b>Interactive lessons</b><span>Learn at your own pace</span></div>
              <div className="tool"><div className="tool-icon">✓</div><b>Quiz studio</b><span>Get instant feedback</span></div>
              <div className="tool"><div className="tool-icon">AI</div><b>Rafiki AI tutor</b><span>Ask in English or Swahili</span></div>
              <div className="tool"><div className="tool-icon">★</div><b>Smart progress</b><span>Know exactly what is next</span></div>
            </div>
          </div>
        </section>

        {/* Pathways / Exams */}
        <section id="exams">
          <div className="shell">
            <div className="section-top">
              <div>
                <div className="eyebrow">Choose your pathway</div>
                <h2>A learning plan for every goal.</h2>
              </div>
              <a className="text-link" onClick={(e) => { e.preventDefault(); onGoToPlans(); }}>View subscriptions →</a>
            </div>
            <div className="path-grid">
              <article className="path">
                <div className="path-num">01 / EXAM PREP</div>
                <h3>Excel in your exams.</h3>
                <p>Focused NECTA revision, timed mock exams and real performance insights for Form 2, Form 4 and Form 6.</p>
                <a onClick={(e) => { e.preventDefault(); openDemo('Open Exams'); }}>Explore exams →</a>
              </article>
              <article className="path">
                <div className="path-num">02 / SKILL BUILDER</div>
                <h3>Practise until it clicks.</h3>
                <p>Take targeted quizzes and brain puzzles that strengthen concepts, not just memory.</p>
                <a onClick={(e) => { e.preventDefault(); openDemo('Open Quiz Studio'); }}>Start a quiz →</a>
              </article>
              <article className="path" id="schools">
                <div className="path-num">03 / FOR SCHOOLS</div>
                <h3>Bring TESEA to your school.</h3>
                <p>Give your teachers and learners a modern, measurable digital learning environment.</p>
                <a onClick={(e) => { e.preventDefault(); openDemo('School partnership'); }}>Partner with us →</a>
              </article>
            </div>
          </div>
        </section>

        {/* Promo / Subscription Banner */}
        <section className="promo" id="subscription">
          <div className="shell">
            <div className="promo-box">
              <div>
                <h2>One subscription.<br />More possibility.</h2>
                <p>Unlock the full TESEA learning experience and study without limits.</p>
              </div>
              <a onClick={(e) => { e.preventDefault(); onGoToPlans(); }} className="btn btn-light" style={{ cursor: 'pointer' }}>View subscription plans →</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="shell">
          <div className="footer-grid">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-lg bg-[#972e4b] text-white grid place-items-center font-bold text-base">✦</span>
                <div className="flex flex-col text-left">
                  <span className="font-serif font-bold text-white text-base leading-none">TESEA</span>
                  <span className="text-[9px] text-[#f4c05b] font-bold tracking-widest uppercase">ACADEMY</span>
                </div>
              </div>
              <p className="footer-intro">Building confident learners for today’s classrooms and tomorrow’s opportunities.</p>
            </div>
            <div>
              <div className="footer-title">LEARNING</div>
              <a onClick={(e) => { e.preventDefault(); openDemo('Courses'); }}>Courses</a>
              <a onClick={(e) => { e.preventDefault(); openDemo('Exams'); }}>Exams</a>
              <a onClick={(e) => { e.preventDefault(); openDemo('Quiz Studio'); }}>Quiz Studio</a>
              <a onClick={(e) => { e.preventDefault(); openDemo('Rafiki AI Tutor'); }}>Rafiki AI Tutor</a>
            </div>
            <div>
              <div className="footer-title">TESEA</div>
              <a onClick={(e) => { e.preventDefault(); openDemo('For Schools'); }}>For Schools</a>
              <a onClick={(e) => { e.preventDefault(); onGoToPlans(); }}>Subscription</a>
              <a onClick={(e) => { e.preventDefault(); openDemo('Help centre'); }}>Help centre</a>
              <a onClick={(e) => { e.preventDefault(); openDemo('Contact us'); }}>Contact us</a>
            </div>
            <div>
              <div className="footer-title">ACCOUNT</div>
              <a onClick={(e) => { e.preventDefault(); onGoToSignin(); }}>Sign in</a>
              <a onClick={(e) => { e.preventDefault(); onGoToSignup(); }}>Create account</a>
              <a onClick={(e) => { e.preventDefault(); onGoToPlans(); }}>Manage subscription</a>
            </div>
          </div>
          <div className="copyright">
            <span>© 2026 TESEA Academy Limited. Learn today. Lead tomorrow.</span>
            <span>Privacy · Terms · Accessibility</span>
          </div>
        </div>
      </footer>

      {/* Feature Modal Backdrop */}
      <div className={`modal-backdrop ${modalOpen ? 'open' : ''}`} aria-hidden={!modalOpen}>
        <div className="feature-modal" role="dialog" aria-modal="true">
          <div className="modal-header">
            <button className="modal-close" onClick={closeDemo} aria-label="Close">×</button>
            <div className="modal-kicker">TESEA ACADEMY • INTERACTIVE PREVIEW</div>
            <h2 className="modal-title">{modalInfo.title}</h2>
            <p className="modal-subtitle">{modalInfo.sub}</p>
          </div>
          <div className="modal-body">
            <div className="demo-note">
              <b>DEMO DATA</b>
              <span>Sample data as of 19 July 2026. Interactive prototype.</span>
            </div>

            {activeModalKey === 'partner' && (
              <div>
                <label className="form-label">Organisation name
                  <input className="modal-input" type="text" defaultValue="Future Minds Foundation" required />
                </label>
                <div className="form-grid">
                  <label className="form-label">Contact person
                    <input className="modal-input" type="text" defaultValue="Neema Mushi" required />
                  </label>
                  <label className="form-label">Work email
                    <input className="modal-input" type="email" defaultValue="neema@futureminds.tz" required />
                  </label>
                </div>
                <label className="form-label">Partnership interest
                  <select className="modal-select">
                    <option>Content partnership</option>
                    <option>School deployment</option>
                    <option>Technology partnership</option>
                  </select>
                </label>
                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={closeDemo}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { showToast('Partnership request sent ✓'); closeDemo(); }}>Send partnership request</button>
                </div>
              </div>
            )}

            {activeModalKey === 'schools' && (
              <div>
                <label className="form-label">School name
                  <input className="modal-input" type="text" defaultValue="Mlimani Secondary School" required />
                </label>
                <div className="form-grid">
                  <label className="form-label">Number of learners
                    <input className="modal-input" type="number" defaultValue="780" required />
                  </label>
                  <label className="form-label">Contact phone
                    <input className="modal-input" type="tel" defaultValue="+255 712 000 000" required />
                  </label>
                </div>
                <label className="form-label">School administrator email
                  <input className="modal-input" type="email" defaultValue="admin@mlimani.ac.tz" required />
                </label>
                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={closeDemo}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { showToast('School demo request submitted ✓'); closeDemo(); }}>Request school demo</button>
                </div>
              </div>
            )}

            {activeModalKey === 'courses' && (
              <div>
                <table className="course-table">
                  <tbody>
                    <tr>
                      <td><b>Biology: Cell to System</b><br />Form 4 · 18 lessons</td>
                      <td>4.9 ★</td>
                    </tr>
                    <tr>
                      <td><b>English for Impact</b><br />Form 2 · 14 lessons</td>
                      <td>4.8 ★</td>
                    </tr>
                    <tr>
                      <td><b>Financial Foundations</b><br />Life skills · 10 lessons</td>
                      <td>New</td>
                    </tr>
                  </tbody>
                </table>
                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={closeDemo}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { onGoToSignup(); closeDemo(); }}>Open course catalogue</button>
                </div>
              </div>
            )}

            {activeModalKey === 'join' && (
              <div>
                <label className="form-label">I am joining as
                  <select className="modal-select">
                    <option>Learner</option>
                    <option>Parent or guardian</option>
                    <option>Tutor</option>
                  </select>
                </label>
                <div className="form-grid">
                  <label className="form-label">Preferred subject
                    <input className="modal-input" type="text" defaultValue="Mathematics" required />
                  </label>
                  <label className="form-label">Study goal
                    <input className="modal-input" type="text" defaultValue="NECTA Form 4" required />
                  </label>
                </div>
                <label className="form-label">Email address
                  <input className="modal-input" type="email" defaultValue="amina.juma@example.com" required />
                </label>
                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={closeDemo}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { onGoToSignup(); closeDemo(); }}>Build my learning plan</button>
                </div>
              </div>
            )}

            {activeModalKey === 'quiz' && (
              <div>
                <label className="form-label">Subject
                  <select className="modal-select">
                    <option>Biology · Form 4</option>
                    <option>Mathematics · Form 4</option>
                    <option>English · Form 2</option>
                  </select>
                </label>
                <div className="form-grid">
                  <label className="form-label">Number of questions
                    <input className="modal-input" type="number" defaultValue="12" required />
                  </label>
                  <label className="form-label">Time limit
                    <input className="modal-input" type="text" defaultValue="15 minutes" required />
                  </label>
                </div>
                <p className="form-note">Estimated score from recent activity: 76%</p>
                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={closeDemo}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { showToast('Quiz generated ✓'); closeDemo(); }}>Generate my quiz</button>
                </div>
              </div>
            )}

            {activeModalKey === 'exams' && (
              <div>
                <label className="form-label">Select paper
                  <select className="modal-select">
                    <option>Mathematics · Form 4 Mock 02</option>
                    <option>Biology · Form 4 Mock 01</option>
                    <option>English · Form 2 Mock 03</option>
                  </select>
                </label>
                <div className="demo-panel">
                  <div>
                    <span>DEMO PAPER</span>
                    <b>50 questions · Calculator allowed</b>
                  </div>
                  <span className="demo-value">1h 45m</span>
                </div>
                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={closeDemo}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { showToast('Demo exam starting…'); closeDemo(); }}>Begin demo exam</button>
                </div>
              </div>
            )}

            {activeModalKey === 'help' && (
              <div>
                <div className="faq">
                  <b>How do I access a course?</b>
                  <p>Choose a course, then create a free account or activate a subscription to unlock lessons.</p>
                </div>
                <div className="faq">
                  <b>Can I use TESEA on my phone?</b>
                  <p>Yes. The platform is built for mobile, tablet and desktop learning.</p>
                </div>
                <div className="faq">
                  <b>How does Rafiki AI help?</b>
                  <p>Ask a question in English or Swahili and receive a guided explanation.</p>
                </div>
                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={closeDemo}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { setActiveModalKey('contact'); }}>Contact support</button>
                </div>
              </div>
            )}

            {activeModalKey === 'contact' && (
              <div>
                <label className="form-label">Your name
                  <input className="modal-input" type="text" defaultValue="Amina Juma" required />
                </label>
                <label className="form-label">Email address
                  <input className="modal-input" type="email" defaultValue="amina.juma@example.com" required />
                </label>
                <label className="form-label">Message
                  <textarea className="modal-textarea" defaultValue="I would like help choosing the right Form 4 subscription." />
                </label>
                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={closeDemo}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { showToast('Message sent to TESEA Support ✓'); closeDemo(); }}>Send message</button>
                </div>
              </div>
            )}

            {activeModalKey === 'rafiki' && (
              <div>
                <div className="chat">
                  {rafikiChat.map((m, idx) => (
                    <div key={idx} className={`bubble ${m.sender === 'user' ? 'user' : 'ai'}`}>
                      {m.text}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleChatSend} className="chat-input">
                  <input
                    className="modal-input"
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    placeholder="Ask anything..."
                  />
                  <button type="submit" className="btn btn-primary">↑</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
