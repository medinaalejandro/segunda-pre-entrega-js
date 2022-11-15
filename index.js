
class Persona {
    constructor(cuil, nombre, apellido, fechaNAc) {
        this.Cuil = cuil,
        this.Nombre = nombre,
        this.Apellido = apellido,
        this.FechaNAc = fechaNAc
    }
   
}

class Vendedor extends Persona {
    constructor(cuil, nombre, apellido, fechaNac) {
        super(cuil, nombre, apellido, fechaNac)
        this.NVendedor,
        this.Venta,
        this.ProductosVendidos,
        this.Fecha
    }
    getDatosVendedor(){
        return ` ${this.Nombre} ${this.Apellido} ${this.Fecha} `
    }

}


let Lista = JSON.parse(localStorage.getItem("lsVendedor")) || [];

Listar();

function Agregar() {

    const _cuil = document.getElementById("txtCuil");
    const _nombre = document.getElementById("txtNombre");
    const _apellido = document.getElementById("txtApellido");
    const _fechaNac = document.getElementById("txtFechaNac");
    const _nVendedor = document.getElementById("txtNVendedor");
    const _venta = document.getElementById("txtVenta");
    const _pVendidos = document.getElementById("txtProductosVendidos");
    const _fecha = document.getElementById("txtFecha");

    let nuevoVendedor = new Vendedor();

    nuevoVendedor.Cuil = parseInt(_cuil.value);
    nuevoVendedor.Nombre = _nombre.value;
    nuevoVendedor.Apellido = _apellido.value;
    nuevoVendedor.FechaNac = parseInt(_fechaNac.value);
    nuevoVendedor.NVendedor = _nVendedor.value;
    nuevoVendedor.Venta = _venta.value;
    nuevoVendedor.ProductosVendidos = _pVendidos.value;
    nuevoVendedor.Fecha = _fecha.value;

    Lista.push(nuevoVendedor);

    localStorage.removeItem("lsVendedor");
    localStorage.setItem("lsVendedor", JSON.stringify(Lista))

    const td0 = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const td7 = document.createElement("td");

    td0.innerHTML = _cuil.value;
    td1.innerHTML = _nombre.value;
    td2.innerHTML = _apellido.value;
    td3.innerHTML = _fechaNac.value;
    td4.innerHTML = _nVendedor.value;
    td5.innerHTML = _venta.value;
    td6.innerHTML = _pVendidos.value;
    td7.innerHTML = _fecha.value;

    const _tr = document.createElement("tr")

    _tr.appendChild(td0);
    _tr.appendChild(td1);
    _tr.appendChild(td2);
    _tr.appendChild(td3);
    _tr.appendChild(td4);
    _tr.appendChild(td5);
    _tr.appendChild(td6);
    _tr.appendChild(td7);

    const _tbody = document.querySelector("tbody");

    _tbody.appendChild(_tr);


    _cuil.value = "";
    _nombre.value = "";
    _apellido.value = "";
    _fechaNac.value = "";
    _nVendedor.value = "";
    _venta.value = "";
    _pVendidos.value = "";
    _fecha.value = "";
    _cuil.focus();
}

function VerEstadisticas() {

    cont = 0;
    acum = 0;
    promedio = 0;

    may = 0;
    mayVenta = 0;

    men = 0;
    b = 0;
    acumVentas = 0;

    vendMayVentas = "";
    vendMenVentas = "";
    vendMayPV = "";
    

    for (let obj of Lista) {
        let o = new Vendedor();
        Object.assign(o, obj);

        promedio = (o.Venta / o.ProductosVendidos);

        cont++;
        acum = acum + parseFloat(o.Venta);

        if (promedio > may) {
            may = promedio;
            vendMayVentas =  ` ${o.Nombre} ${o.Apellido} ${o.Fecha} `;
        }

        if (promedio < men || b == 0) {
            men = promedio;
            vendMenVentas = ` ${o.Nombre} ${o.Apellido} ${o.Fecha} `;
            b = 1;
        }

        if (o.ProductosVendidos > mayVenta) {
            mayVenta = o.ProductosVendidos;
            vendMayPV = o.getDatosVendedor();
        }
        acumVentas = acumVentas + parseFloat(o.Venta);
    }


    const _vta = document.getElementById("lblVentaTotalAcum");
    _vta.innerHTML = `$${acumVentas}`;

    const mayPV = document.getElementById("lblMayorPromVentas");
    mayPV.innerHTML = ` ${vendMayVentas} $${may} `;

    const _menPV = document.getElementById("lblMenorPromVentas");
    _menPV.innerHTML = ` ${vendMenVentas} $${men} `;

    const _mayVPV = document.getElementById("lblVendMasProductosVendidos");
    _mayVPV.innerHTML = ` ${mayVenta} - ${vendMayPV} `;
}



function Limpiar() {

    localStorage.removeItem("lsVendedor");

    const _tbody = document.querySelector("tbody");
    _tbody.innerHTML = "";

    const _vta = document.getElementById("lblVentaTotalAcum");
    _vta.innerHTML = 0;

    const mayPV = document.getElementById("lblMayorPromVentas");
    mayPV.innerHTML = 0;

    const _menPV = document.getElementById("lblMenorPromVentas");
    _menPV.innerHTML = 0;

    const _mayVPV = document.getElementById("lblVendMasProductosVendidos");
    _mayVPV.innerHTML = 0;

    Lista = [];
}

