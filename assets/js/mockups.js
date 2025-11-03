const $inicio = document.getElementById('inicio');
const $servicios = document.getElementById('servicios');
const $proyectoscontenedor = document.getElementById('proyectos_contenedor');
const $mockupproyecto = document.getElementById('mostrar_mockup');
const $botoninicio = document.getElementById('boton_inicio');
const $botonservicios = document.getElementById('boton_servicios');
const $botonproyectos = document.getElementById('boton_proyectos');

const vermas = ()=>{
	$mockupproyecto.classList.remove('ocultar');
	$inicio.classList.add('ocultar');
	$servicios.classList.add('ocultar');
	$proyectoscontenedor.innerHTML = "";
	// $proyectoscontenedor.classList.add('ocultar');
}

const reset = ()=>{
	$mockupproyecto.classList.add('ocultar');
	$inicio.classList.remove('ocultar');
	$servicios.classList.remove('ocultar');
	printProyectos()
	$mockupproyecto.innerHTML = ""
	$mockupproyecto.classList.remove("mostrar_mockup")
}
$botoninicio.addEventListener('click', e =>{reset()});
$botonservicios.addEventListener('click', e =>{reset()});
$botonproyectos.addEventListener('click',e =>{reset()});

var mockupsPorProyecto = []
let impresiones = 0;

function construirRuta(){
	listaDisenhos.forEach(({ id, ruta }) => {
    mockupsPorProyecto[id] = generarRutasMockups(ruta);
  	});
}

function limpiarEstilosSiEsNecesario() {
  impresiones++;
  if (impresiones > 10) {
    document.querySelectorAll('style[data-mockup-style="true"]').forEach(el => el.remove());
    impresiones = 0;
  }
}
function printProyectos(){
	let $proyectoTarget = "";
    for (let i = 0; i < listaDisenhos.length; i++) {
    	$proyectoTarget += `
	 	<div class="proyectos_target">
     		<a href="${listaDisenhos[i].link}" target="_blank" class="">
     	    	<div class="proyectos_img ${listaDisenhos[i].id}"></div>
     		</a>
     		<div class="proyecto_detalles">
     	    	<h3 class="proyecto_subtitulo">
     	        	${listaDisenhos[i].nombre}
     	    	</h3>
     	    	<p class="proyecto_parrafo">
     	        	${listaDisenhos[i].parrafo}
     	    	</p>
     	    	<p class="vermas_alineacion">
     	        	<button onclick='printListaMockup("${listaDisenhos[i].id}")' class="vermas">
     	                Mostrar +
     	        	</button>
     	    	</p>
     		</div>
     	</div>
	 	`;
    }
	$proyectoscontenedor.innerHTML = $proyectoTarget;
	construirRuta()
	return $proyectoscontenedor
}

function generarRutasMockups(id) {
  const extensiones = ["png", "jpg", "gif"];
  const cantidad = "15" //ingresar la cantidad mas alta de los elementos
  const rutas = [];
  for (let i = 0; i <= cantidad; i++) {
    extensiones.forEach(ext => {
      	const ruta = `./assets/imagenes/mockups/${id}/${id} (${i}).${ext}`;
      	const img = new Image();
      	img.src = ruta;
      	img.onload = () => {rutas.push(ruta)};
		img.onerror = () => {console.clear()};// No hace nada si no existe
    });
  }
  return rutas;
}

const printBoton = (id) => {
    const $logosmockup = document.getElementById('logosmockup');
    // Reordenar el array
    const listaOrdenada = listaDisenhos.slice().sort((a, b) => {
        if (a.id === id) return -1;
        if (b.id === id) return 1;
        return 0;
    });
	let $mockupimg = "";
    for (let i = 1; i < listaOrdenada.length; i++) {
        $mockupimg += `
		<button class="otros_mockups_img ${listaOrdenada[i].id}" 
		id="${listaOrdenada[i].id}"
		onclick='printListaMockup("${listaOrdenada[i].id}")'></button>
		`;
    }
    $logosmockup.innerHTML = $mockupimg;
    return $logosmockup;
};

const printMockupContenedor = (id)=>{
	const $listamockup = document.getElementById("listamockup");
	const color = listaDisenhos.find(item => item.id === id).fondo;
	$listamockup.innerHTML="";
	$listamockup.style.background = color

	let listaMockups = mockupsPorProyecto[id];
	
	const resultado = listaDisenhos.find(item => item.id === id).nombre;
	
	if (!listaMockups) {
		$listamockup.innerHTML = '<p class="proyecto_subtitulo"> No hay mockups disponibles para este proyecto.</p>';
		return;
	}
	$listamockup.innerHTML=`
	<div class="nombre_mockup_visualizado" >
		<img class="logo_seleccionado ${id}" >
		<div>
			<p class="subtitulo">${resultado}</p>
			<p class="discleimer"> Los diseños de mockups mostrados a continuación son imágenes referenciales que ilustran usos reales o potenciales de la marca en distintos entornos visuales.
			<br>
			Esta presentación no busca replicar campañas de terceros, sino documentar aplicaciones gráficas que reflejan la coherencia, versatilidad y propósito estratégico de la marca en contextos reales o simulados.
			</p>
		</div>
	</div>
	<div id="listamockup${id}" class="lista_mockup"></div> 		
	`
	const listaMockupsid = document.getElementById(`listamockup${id}`);
	
	// listaMockups = listaMockups.slice();

	if(listaMockups.length  < 3)
		{
			listaMockupsid.classList.remove("lista_mockup")
			listaMockupsid.classList.remove("lista_mockup_1")
			listaMockupsid.classList.add("lista_mockup_2")
	}
	if(listaMockups.length  === 1){
		listaMockupsid.classList.remove("lista_mockup")
		listaMockupsid.classList.remove("lista_mockup_2")
		listaMockupsid.classList.add("lista_mockup_1")
	}
	if (listaMockups.length === 0) {
		  listaMockupsid.innerHTML = "<p>No hay mockups disponibles para este proyecto.</p>";
	  }
	
	//  for(let i = listaMockups.length -1; i>0;i--){
	// 	const j = Math.floor(Math.random()*(i+1));
	// 	[listaMockups[i], listaMockups[j]] = [listaMockups[j], listaMockups[i]]
	// }

	limpiarEstilosSiEsNecesario()

	listaMockups.forEach((ruta, index) => {
  		const div = document.createElement("div");
  		const claseUnica = `mockup_${index + 1}`;

  		div.classList.add("lista_mockup_img", claseUnica);
  		listaMockupsid.appendChild(div);

  		// Precargar imagen para detectar dimensiones
  		const img = new Image();
  		img.src = ruta;
  		img.onload = () => {
  		  const ratio = img.width / img.height;
		
  		  // Inyectar estilo dinámico con aspect-ratio
  		  const estilo = document.createElement("style");
		  estilo.setAttribute("data-mockup-style", "true");
  		  estilo.textContent = `
  		    .${claseUnica} {
  		      	aspect-ratio: ${img.width} / ${img.height};
  		      	background-image: url('${ruta}');
  		      	background-size: contain;
  		      	background-repeat: no-repeat;
				border-radius: 8px;
  		      	background-position: center;
  		    }
  		  `;
  		  document.head.appendChild(estilo);
  		};
	});

}

const printListaMockup = (id) =>{
	vermas()
	$mockupproyecto.classList.add("mostrar_mockup")
	$mockupproyecto.innerHTML=""
	$mockupproyecto.innerHTML = `
	<button id="regresar" class="regresar">
	<i class="fa-solid fa-angles-left"></i>
	Salir
	</button>
	<p class="subtitulo">Otros proyectos</p>
	<div class="otros_mockups" id="logosmockup"></div>
	<div id="listamockup" class="contenedor_mockup"></div> 		
	`;
	const $regresar = document.getElementById('regresar');
	$regresar.addEventListener('click',  () => {reset()});
	printBoton(id)
	printMockupContenedor(id)
	return $mockupproyecto
}
printProyectos()

// document.addEventListener("contextmenu", e => e.preventDefault());