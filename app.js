
var alpaka = function (size) {

    var self = this;

    self.background = "#FCF";
    self.color = "#36F";
    self.white = "#fff";
    self.black = "#000";

    self.bgNodes = [];
    self.colorNodes = [];
    self.whiteNodes = [];
    self.blackNodes = [];

    self.shape = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 1, 2, 3, 2, 2, 2, 2, 2, 3, 2, 1, 0],
        [0, 1, 2, 2, 2, 3, 2, 3, 2, 2, 2, 1, 0],
        [0, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1, 0],
        [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];


    self.width = Math.floor(size);
    self.pixelsize = Math.floor(self.width / self.shape[0].length);
    self.height = (self.pixelsize) * self.shape.length;


    self.svgns = "http://www.w3.org/2000/svg";
    self.svg = document.createElementNS(self.svgns, "svg");
    self.svg.setAttributeNS(null, "width", self.width);
    self.svg.setAttributeNS(null, "height", self.height);

    self.init = function () {
        self.randomize();

        for (var i = 0; i < self.shape.length; i++) {
            for (var j = 0; j < self.shape[i].length; j++) {
                var rect = document.createElementNS(self.svgns, "rect");
                rect.setAttributeNS(null, "width", self.pixelsize);
                rect.setAttributeNS(null, "height", self.pixelsize);

                rect.setAttributeNS(null, "y", (self.pixelsize) * i);
                rect.setAttributeNS(null, "x", (self.pixelsize) * j);

                if (self.shape[i][j] == 0) { self.bgNodes.push(rect); rect.setAttributeNS(null, "fill", self.background); }
                if (self.shape[i][j] == 1) { self.colorNodes.push(rect); rect.setAttributeNS(null, "fill", self.color); }
                if (self.shape[i][j] == 2) { self.whiteNodes.push(rect); rect.setAttributeNS(null, "fill", self.white); }
                if (self.shape[i][j] == 3) { self.blackNodes.push(rect); rect.setAttributeNS(null, "fill", self.black); }

                self.svg.appendChild(rect);
            }
        }

        document.getElementById("container").appendChild(self.svg);

        self.redo();
    };

    self.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    self.randomize = function () {
        self.background = self.getRandomColor();
        self.color = self.getRandomColor();
        self.white = self.getRandomColor();
        self.black = self.getRandomColor();
    };

    self.redo = function () {
        self.randomize();

        self.bgNodes.forEach(function (item) { item.setAttributeNS(null, "fill", self.background); });
        self.colorNodes.forEach(function (item) { item.setAttributeNS(null, "fill", self.color); });
        self.whiteNodes.forEach(function (item) { item.setAttributeNS(null, "fill", self.white); });
        self.blackNodes.forEach(function (item) { item.setAttributeNS(null, "fill", self.black); });

        window.setTimeout(self.redo, Math.floor(Math.random() * 2000));
    }
}


var countW = Math.floor(window.innerWidth / 130);
var countH = Math.floor(window.innerHeight / 120) + 1;

console.log(countH * countW);

for (var x = 0; x < (countH * countW); x++) {
    var a = new alpaka(130);
    a.init();
}
