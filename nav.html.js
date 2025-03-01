pathId = []
pathId["/"] = "home";
pathId["/feladat-4/index.html"] = "chartjs";
pathId["/feladat-5/ajax.html"] = "ajax";
pathId["/feladat-6/index.html"] = "oojs";

$(pathId[window.location.pathname]).classList.add("border-b-1", "rounded");
