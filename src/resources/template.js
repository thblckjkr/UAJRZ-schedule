var template = {
   UACJ: {
      instructions: "Tu info en linea -> Datos alumno -> Datos academicos -> Materias por cursar",
      baseUrl: "https://escolar.uacj.mx/alumnos/info_linea/frmMateriasCursar.aspx",
      tableId: "GridView_MateriasPorCursarPlan",
      columnName: "Clave",
      columnID: 0,
      campus: [
         { name: "IIT", documentName: "resources/uacj.iit.csv" },
         /* { name: "ICB", documentName: "resources/uacj.icb.csv" },
         { name: "IADA", documentName: "resources/uacj.iada.csv" },
         { name: "ICSA", documentName: "resources/uacj.icsa.csv" },
         { name: "CU", documentName: "resources/uacj.cu.csv" } */
      ]
   }
}