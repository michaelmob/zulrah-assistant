playerPositions = [ "bottom left", "left", "top", "right", "bottom right" ];

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }


function hideAllRotations() {
	var rotations = $$(".rotation,.selection");

	for (var i = rotations.length - 1; i >= 0; i--) {
		rotations[i].classList.add("hidden");
	}

	$(".pre-rotation").classList.add("hidden");
	$(".second.phase").classList.add("hidden");
}

// Modify Stages to add Zulrah phases
var stages = $$(".stage")
for (var i = stages.length - 1; i >= 0; i--) {
	var data = stages[i].getAttribute("data-phase").split("|");

	var player = document.createElement("span");
	var zulrah = document.createElement("span");

	player.className = "player " + playerPositions[data[1] - 1];
	zulrah.className = "zulrah " + data[0];

	stages[i].appendChild(player);
	stages[i].appendChild(zulrah);

	stages[i].removeAttribute("data");
}

// Click Listeners
var stages = $$(".select .stage:not(.next)");
for (var i = stages.length - 1; i >= 0; i--) {
	stages[i].addEventListener("click", function() {
		var rotation = this.getAttribute("data-rotation");

		if(rotation == undefined)
			return;

		// Hide Rotations
		hideAllRotations();

		// Show Rotation
		$(".rotation." + rotation).classList.remove("hidden");
	});
}

// Show second selectino
$(".stage.next").addEventListener("click", function() {
	// Hide first phase
	$(".first.phase").classList.add("hidden");
	$(".first.selection").classList.add("hidden");

	// Show second phase
	$(".second.phase").classList.remove("hidden");
	$(".second.selection").classList.remove("hidden");
});

$(".restart").addEventListener("click", function() {
	// Restart
	hideAllRotations();

	// Show starting phase and selection
	$(".pre-rotation").classList.remove("hidden");
	$(".first.selection").classList.remove("hidden");
	$(".first.phase").classList.remove("hidden");

	// Remove temporary faded class
	var stages = $$(".temp.faded");

	for (var i = stages.length - 1; i >= 0; i--) {
		stages[i].classList.remove("temp", "faded");
	}
});

$(".current").addEventListener("click", function() {
	var el = $(".rotation:not(.hidden) .stage:not(.faded)");
	if(el != undefined)
		el.classList.add("temp", "faded");
});

$(".instructions").addEventListener("click", function() {
	$("table.instructions").classList.toggle("hidden");
});