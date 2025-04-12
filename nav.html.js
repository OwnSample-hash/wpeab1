pathId = [];
pathId["/"] = "home";
pathId["/feladat-2/tabla.html"] = "tabla";
pathId["/feladat-3/html5.html"] = "html5";
pathId["/feladat-4/index.html"] = "chartjs";
pathId["/feladat-5/ajax.html"] = "ajax";
pathId["/feladat-6/index.html"] = "oojs";

$(pathId[window.location.pathname]).classList.add("border-b-1", "rounded");
 