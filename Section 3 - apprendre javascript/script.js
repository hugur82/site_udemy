window.onload = function()
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 680;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;
    var score;
    var timeout;

    init();
    
    function init(){
        var canvas = document.createElement('canvas');
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid grey";
        canvas.style.backgroundColor="#ddd";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]], "right");
        applee = new Apple([10,10]);
        score = 0;
        refreshCanvas();
    }
    
    function refreshCanvas(){
        snakee.advance();
        if (snakee.checkCollision())
        {
            gameOver();
        }
        else
        {
            if (snakee.isEatingApple(applee))
            {
                snakee.ateApple = true;
                score += 1;
                speed();
                do
                {
                    applee.setNewPosition();
                }
                while(applee.isOnSnake(snakee))
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawScore();
            snakee.draw();
            applee.draw();
            timeout = setTimeout(refreshCanvas, delay);
        }
    }

    function gameOver(){
        ctx.save();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const text = 'Game Over \n appuyer sur espace pour recommance';
        ctx.fillText(text, canvasWidth / 2  , canvasHeight /2);
        ctx.restore();
    }
    
    function restart(){
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]], "right");
        applee = new Apple([10,10]);
        score = 0;
        delay = 680;
        clearTimeout(timeout);
        refreshCanvas();
    }

    function speed(){
        if (score < 5)
            delay -=30;
        else if (score < 15)
                delay -=20;
            else if (score < 25)
                    delay -=12;
                else
                    delay -= 8;
    }

    function drawScore(){
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.font = '12px Verdana';
        ctx.fillText("Score: " + score.toString(), canvasWidth - 62, 20);
        ctx.fillText("speed: " + delay.toString(), canvasWidth - 80, canvasHeight - 10);
        ctx.restore();
    }

    function drawBlock(ctx, position){
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x,y,blockSize,blockSize);
    }

    function Snake(body, direction){
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = "rgb(8, 91, 13)";
            for(var i = 0; i < this.body.length; i++)
            {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();     
        };
        this.advance = function(){
            var nextPosition = this.body[0].slice();
            switch (this.direction)
                {
                    case "left":nextPosition[0] -= 1;
                    break;
                    case "right":nextPosition[0] += 1;
                    break;
                    case "down":nextPosition[1] += 1;
                    break;
                    case "up":nextPosition[1] -= 1;
                    break;
                    default:throw("invalid direction");
                }
                this.body.unshift(nextPosition);
                if (!this.ateApple)
                    this.body.pop();
                else
                    this.ateApple = false;
        };
        this.setDirection = function (newDirection){
            var allowDirections;
            switch(this.direction)
            {                
                case "left":
                case "right":allowDirections = ["up", "down"];
                break;
                case "down":
                case "up":allowDirections = ["left", "right"];
                break;
                default:throw("invalid direction");
            }
            if (allowDirections.indexOf(newDirection) > -1)
            {
                this.direction = newDirection;
            }
        };
        this.checkCollision = function(){
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
            {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++)
            {
                if(snakeX === rest[i][0] && snakeY === rest[i][1])
                {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;
        };
        
        this.isEatingApple = function (appleToEat){
            var head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        }
    }

    function Apple(position){
        this.position = position;
        this.draw = function (){
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0]*blockSize + radius; 
            var y = this.position[1]*blockSize + radius; 
            ctx.arc(x, y, radius,0 ,Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };
        this.setNewPosition = function(){
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };
        this.isOnSnake = function(snakeToCheck){
            var isOnSnake = false;
            for (var i = 0; i < snakeToCheck.body.length;i++)
            {
                if (snakeToCheck.body[i][0] === this.position[0] && snakeToCheck.body[i][1] === this.position[1])
                    isOnSnake = true;
            }
            return isOnSnake;
        }
    }

    document.onkeydown = function handleKeyDown(e){
        var key = e.keyCode;
        var newDirection;
        switch (key)
        {
            case 37:newDirection = "left";
            break;
            case 38:newDirection = "up";
            break;
            case 39:newDirection = "right";
            break;
            case 40:newDirection = "down";
            break;
            case 32:restart();
                return;
            break;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    }
}

