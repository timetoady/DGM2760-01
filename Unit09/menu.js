function duplicateMenu() {
  let topMenu = document.querySelectorAll("ul#primaryNavigation li a");
  let bottomMenu = document.createElement("ul");
  topMenu.forEach(menuItem => {
    let bottomNav = document.querySelector("#smallNavArea");
    let newLI = document.createElement("li");
    let newLink = document.createElement("a");
    newLink.setAttribute("href", menuItem.getAttribute("href"));
    newLink.textContent = menuItem.text;
    bottomNav.appendChild(bottomMenu);
    bottomMenu.appendChild(newLI);
    newLI.appendChild(newLink);
  });
}

duplicateMenu();
