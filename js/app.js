playerPositions = ["bottom left", "left", "top", "right", "bottom right"];

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }

function hideAllRotations() {
	var rotations = $$(".rotation,.selection");

	for (var i = rotations.length - 1; i >= 0; i--)
		rotations[i].classList.add("hidden");

	$(".pre-rotation").classList.add("hidden");
	$(".second.phase").classList.add("hidden");
}

function restart() {
	// Restart
	hideAllRotations();

	// Show starting phase and selection
	$(".pre-rotation").classList.remove("hidden");
	$(".first.selection").classList.remove("hidden");
	$(".first.phase").classList.remove("hidden");

	// Remove temporary faded class
	var stages = $$(".temporary.faded");

	for (var i = stages.length - 1; i >= 0; i--)
		stages[i].classList.remove("temporary", "faded");
}

function fadeNext() {
	var el = $(".rotation:not(.hidden) .stage:not(.faded)");

	// Fade next
	if (el != undefined)
		el.classList.add("temporary", "faded");

	// Restart
	else
		$(".restart").click();
}

/* Add phases to stages */
var stages = $$(".stage");
for (var i = stages.length - 1; i >= 0; i--) {
	var player = document.createElement("span");
	var zulrah = document.createElement("span");

	var playerPosition = stages[i].getAttribute("data-player");
	var zulrahPhase = stages[i].getAttribute("data-phase");

	player.className = "player " + playerPositions[playerPosition - 1];
	zulrah.className = "zulrah " + zulrahPhase;

	stages[i].appendChild(player);
	stages[i].appendChild(zulrah);

	stages[i].removeAttribute("data");
}

/* Rotation selectors */
var stages = $$(".select .stage:not([data-rotation='-'])");
for (var i = stages.length - 1; i >= 0; i--) {
	stages[i].addEventListener("click", function() {
		var rotation = this.getAttribute("data-rotation");

		if (rotation == undefined)
			return;

		// Hide Rotations
		hideAllRotations();

		// Show Rotation
		$(".rotation." + rotation).classList.remove("hidden");
	});
}

/* Second selection */
$(".stage[data-rotation='-']").addEventListener("click", function() {
	// Hide first phase
	$(".first.phase").classList.add("hidden");
	$(".first.selection").classList.add("hidden");

	// Show second phase
	$(".second.phase").classList.remove("hidden");
	$(".second.selection").classList.remove("hidden");
});

/* Restart Button */
$(".restart").addEventListener("click", restart);

/* Instructions Button */
$(".instructions").addEventListener("click", function() {
	$("table.instructions").classList.toggle("hidden");
});

/* Next Fade */
$(".current").addEventListener("click", fadeNext);

/* Shortcut Keys */
document.body.onkeyup = function(e) {
	// Spacebar
	if (e.keyCode == 32) {
		fadeNext();
	}

	// R
	else if (e.keyCode == 82) {
		restart();
	}

	// 1
	else if (e.keyCode == 49) {
		if (!$(".first.selection").classList.contains("hidden"))
			$(".first.selection [data-shortcut='1']").click();

		else if (!$(".second.selection").classList.contains("hidden"))
			$(".second.selection [data-shortcut='1']").click();
	}

	// 2
	else if (e.keyCode == 50) {
		if (!$(".first.selection").classList.contains("hidden"))
			$(".first.selection [data-shortcut='2']").click();

		else if (!$(".second.selection").classList.contains("hidden"))
			$(".second.selection [data-shortcut='2']").click();
	}

	// 3
	else if (e.keyCode == 51) {
		if (!$(".first.selection").classList.contains("hidden"))
			$(".first.selection [data-shortcut='3']").click();

		else if (!$(".second.selection").classList.contains("hidden"))
			$(".second.selection [data-shortcut='3']").click();
	}

}