
Push.create("HOla a todos!", {
    body: "¿ Como esta mi ratoncita :3'?",
    icon: 'imagenes/iconos(paginas)/iconluna.png',
    timeout: 4000,
    onClick: function () {
        window.focus();
        this.close();
    }
});