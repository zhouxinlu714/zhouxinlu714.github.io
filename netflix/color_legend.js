function rampHorizontal(x, color) {
  var size = 16;

  function ramp(g) {
    var image = g.selectAll("image").data([null]),
        xz = x.range(),
        x0 = xz[0],
        x1 = xz[xz.length - 1],
        canvas = document.createElement("canvas"),
        context = (canvas.width = x1 - x0 + 1, canvas.height = 1, canvas).getContext("2d");

    for (var i = x0; i <= x1; ++i) {
      context.fillStyle = color(x.invert(i));
      context.fillRect(i - x0, 0, 1, 1);
    }

    image = image.enter().append("image").merge(image)
        .attr("x", x0)
        .attr("y", -size)
        .attr("width", x1 - x0 + 1)
        .attr("height", size)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", canvas.toDataURL());
  }

  ramp.position = function(_) {
    return arguments.length ? (x = _, ramp) : x;
  };

  ramp.color = function(_) {
    return arguments.length ? (color = _, ramp) : color;
  };

  ramp.size = function(_) {
    return arguments.length ? (size = +_, ramp) : size;
  };

  return ramp;
};
