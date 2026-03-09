<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <link rel="icon" href="./favicon.png">

    <title>PRAXIS</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap"
      rel="stylesheet"
    />
    <style>
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Inter", sans-serif;
        /* background: #f5f6fa; */
        background: #ffffff;
        color: #1a1d2e;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      /* HEADER */
      header {
        background-color: #4978B0;
        background-image: url('img/bar-header.png');
        background-repeat: repeat-x;
        background-position: 0;
        border-bottom: 2px solid #ff0000;
        font-family: Tahoma, Geneva, Verdana, sans-serif;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
      }

      .h-left {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
      }
      .logo-mark {
        width: 38px;
        height: 38px;
        background: #eef2ff;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
      .logo-text {
        font-size: 11px;
        font-weight: 700;
        color: #3a5bd9;
        line-height: 1.5;
      }
      .h-center {
        flex: 1;
        text-align: center;
        color: white;
      }
      .h-center h1 {
        font-size: 23px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
      .h-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        gap: 6px;
      }

      /* MAIN */
      main {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }

      .hero {
        text-align: center;
        max-width: 500px;
        animation: up 0.6s ease both;
        background-image: url(img/nubes.svg);
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: top;
      }
      @keyframes up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 14px;
        background: #edfff1;
        border: 1px solid #a3e8b0;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 700;
        color: #1a9e40;
        margin-bottom: 1.8rem;
      }
      .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #1a9e40;
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
      }

      .code {
        font-size: clamp(96px, 20vw, 160px);
        font-weight: 800;
        color: #1a1d2e;
        line-height: 1;
        letter-spacing: -6px;
        margin-bottom: 0.8rem;
        opacity: 0.6;
      }
      .code span {
        color: #5e90c5;
      }

      .rule {
        width: 32px;
        height: 2px;
        background: #00458e;
        margin: 1.4rem auto;
        border-radius: 2px;
      }
      .title {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 4px;
        text-transform: uppercase;
        margin-bottom: 0.8rem;
      }
      .desc {
        font-size: 15px;
        font-weight: 300;
        color: #6b7280;
        line-height: 1.8;
        /* margin-bottom: 0.5rem; */
        margin-bottom: 2.2rem;
      }
      .quip {
        font-size: 13px;
        color: #3a5bd9;
        opacity: 0.6;
        font-style: italic;
        margin-bottom: 2.2rem;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 28px;
        background: #00458e;
        color: #fff;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        transition:
          background 0.2s,
          transform 0.2s;
      }
      .btn:hover {
        background: #012953;
        transform: translateY(-2px);
      }
    </style>
  </head>
  <body>
    <header>
      <div class="h-left">
        <!-- <div class="logo-mark">‚??Ô∏è</div>
        <div class="logo-text">AeroFinance<br />Solutions</div> -->
        <img src="img/menu/logo-aeromexico.png" width="248" />
      </div>
      <div class="h-center"><h1>PRAXIS</h1></div>
      <div class="h-right">
        <!-- <div class="badge badge-a">AUDIT PRO</div>
        <div class="badge badge-b">SAC v2.0</div> -->
        <div class="badge badge-a"><img src="img/IATA_SP.png" width="120" /></div>
        <div class="badge badge-b"><img src="img/logo_miatech3.png" width="150" /></div>
      </div>
    </header>

    <main>
      <div class="hero">
        <!-- <div class="pill">
          <div class="dot"></div>
          404 ¬∑ OK
        </div> -->
        <div class="code">PRAXIS</div>
        <div class="rule"></div>
        <div class="title">REVENUE ACCOUNTING</div>
        <p class="desc">
          Unable to Process Request, please contact helpdesk for support.
        </p>
        <!-- <p class="quip">‚??Ô∏è Hasta el auditor est√° sonriendo hoy.</p>
        <a href="#" class="btn">‚?? &nbsp;Ingresar al sistema</a>
		 -->
      </div>
    </main>

  </body>
</html>
