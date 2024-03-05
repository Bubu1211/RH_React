import axios from "axios";
import React, { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

//componente de clase
export default function ListadoEmpleados() {
  const urlBase = "http://localhost:8080/rh-app/empleados";
  const [empleados, setEmpleados] = useState([]);

  //este hook se manda a llamar cuando se carga el componente o la página
  //el segundo parametro del hook es u arreglo vacío, para que se haga una vez y no muchas veces
  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado de cargar empleados");
    console.log(resultado.data);
    setEmpleados(resultado.data);
  };

  const eliminarEmpleado = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarEmpleados();
  };

  const generarQr = (empleado) => {};

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Sistema de Recursos Humanos</h3>
      </div>
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            //Iteramos el arreglo de empleados
            empleados.map((empleado, indice) => (
              <tr key={indice}>
                <th scope="row">{empleado.idEmpleado}</th>
                <td>{empleado.nombre}</td>
                <td>{empleado.departamento}</td>
                <td>
                  <NumericFormat
                    value={empleado.sueldo}
                    displayType={"text"}
                    thousandSeparator=","
                    preefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </td>
                <td className="text-center">
                  <div>
                    <Link
                      to={`/editar/${empleado.idEmpleado}`}
                      className="btn btn-warning btn-sm me-3"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => eliminarEmpleado(empleado.idEmpleado)}
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
