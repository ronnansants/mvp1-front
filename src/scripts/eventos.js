export function btnLimpar(element, event) {
  event.preventDefault();
  let opc = confirm("Certeza que deseja limpar os dados digitados?");
  if (opc === true) {
    element.form.reset();
  }
}
