$(document).ready(function () {
    setTimeout(function () {
        var canv = `<canvas id="canvas"></canvas>`;
        $('body').append(canv);
        var body = $('body'),
            htmlElement = $('html');

        // Hàm để cập nhật chiều cao canvas
        function updateCanvasHeight() {
            var height = Math.max(body[0].scrollHeight, body[0].offsetHeight, htmlElement[0].clientHeight, htmlElement[0].scrollHeight, htmlElement[0].offsetHeight);
            $('#canvas').css('height', height + 'px');
            return height;
        }

        var height = updateCanvasHeight();

        function startAnimation() {
            const CANVAS_WIDTH = $(window).width();
            const CANVAS_HEIGHT = updateCanvasHeight();
            const MIN = 0;
            const MAX = CANVAS_WIDTH;
            const canvas = $('#canvas')[0];
            const ctx = canvas.getContext("2d");
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
            function clamp(number, min = MIN, max = MAX) {
                return Math.max(min, Math.min(number, max));
            }
            function random(factor = 1) {
                return Math.random() * factor;
            }
            function degreeToRadian(deg) {
                return deg * (Math.PI / 180);
            }
            class Snowflake {
                radius = 0;
                x = 0;
                y = 0;
                vx = 0;
                vy = 0;
                constructor(ctx) {
                    this.ctx = ctx;
                    this.reset();
                }
                draw() {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = "rgba(255,255,255,0.8)";
                    for (let i = 0; i < 6; i++) {
                        this.ctx.moveTo(this.x, this.y);
                        this.ctx.lineTo(this.x + this.radius * Math.cos(degreeToRadian(60 * i)), this.y + this.radius * Math.sin(degreeToRadian(60 * i)));
                    }
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
                reset() {
                    this.radius = random(10);
                    this.x = random(CANVAS_WIDTH);
                    this.y = this.y ? 0 : random(CANVAS_HEIGHT);
                    this.vx = clamp((Math.random() - 0.5) * 0.4, -0.4, 0.4);
                    this.vy = clamp(random(1.5), 0.1, 0.8) * this.radius * 0.5;
                }
            }
            let snowflakes = [];
            for (let i = 0; i < 300; i++) {
                snowflakes.push(new Snowflake(ctx));
            }
            function clearCanvas() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            let canvasOffset = {
                x0: canvas.offsetLeft,
                y0: canvas.offsetTop,
                x1: canvas.offsetLeft + canvas.width,
                y1: canvas.offsetTop + canvas.height,
            };
            function animate() {
                clearCanvas();
                snowflakes.forEach((e) => {
                    if (e.x <= canvasOffset.x0 || e.x >= canvasOffset.x1 || e.y <= canvasOffset.y0 || e.y >= canvasOffset.y1) {
                        e.reset();
                    }
                    e.x = e.x + e.vx;
                    e.y = e.y + e.vy;
                    e.draw();
                });
                requestAnimationFrame(animate);
            }
            animate();
        }

        startAnimation();
        $(window).on('resize', function() {
            startAnimation();
            updateCanvasHeight(); // Cập nhật chiều cao canvas khi thay đổi kích thước cửa sổ
        });
        $(window).on('scroll', function() {
            updateCanvasHeight(); // Cập nhật chiều cao canvas khi cuộn trang
        });
    }, 500);
});
