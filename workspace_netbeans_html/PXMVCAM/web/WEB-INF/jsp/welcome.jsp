<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Bienvenido - Okta</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f9f9f9;
            text-align: center;
            padding-top: 100px;
        }
        .container {
            background: #fff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            display: inline-block;
        }
        .okta-logo {
            width: 180px;
            margin-bottom: 20px;
        }
        h1 {
            color: #003f91;
            font-size: 28px;
            margin-bottom: 10px;
        }
        p {
            color: #444;
            font-size: 16px;
        }
        .btn-logout {
            margin-top: 25px;
            display: inline-block;
            padding: 10px 20px;
            background-color: #007dc1;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            transition: background 0.3s;
        }
        .btn-logout:hover {
            background-color: #005b8a;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Bienvenido a Praxis!</h1>
        <h2>Hola, <%= request.getAttribute("username") %></h2>
        <p>Has iniciado sesión correctamente con Okta.</p>

        <!-- Botón de logout -->
        <a href="/logout" class="btn-logout">Cerrar Sesión</a>
    </div>
</body>
</html>
