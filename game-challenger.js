function gameChallenger (colors) {
    this.head = null;

    this.initializeGame = function (colors) {

        if(colors.length > 0) {
            let colorsArray = colors.split("");
            this.head = new Node(colorsArray[0]);
        
            for (let i=1; i < colorsArray.length; i++) {
                this.addNode(colorsArray[i]);
            }
        }
    }

    this.print = function () {
        let current = this.head;
        
        while(current != null) {
            console.log(current.value)
            current = current.next;
        }
    }

    this.addNode = function (color) {
        let newNode = new Node(color);

        if(!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;

            while(current.next != null) {
                current = current.next;
            }
            newNode.prev = current
            current.next = newNode;
        }
        return newNode;
    }

    this.removeNode = function (node) {
        //remove head
        if(!node.prev) {
            let nextNode = node.next;
            nextNode.prev = null;
        } else {
            let prevNode = node.prev;
            let nextNode = node.next;
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
        }
    }

    this.playGame = function () {
        const WENDY = 'wendy';
        const BOB = 'bob';
        const WHITE_COLOR = 'w';
        const BLACK_COLOR = 'b';
        let currentPlayer = WHITE_COLOR;
        let gameOver = false;
        let winner = currentPlayer;
        
        while (!gameOver) {
            let currentNode = this.head;
            let turnOver = false;

            while (currentNode != null) {
               
                if(currentNode.prev != null && currentNode.next != null) {
                    if((currentNode.value === currentPlayer)
                            && (currentNode.prev.value === currentPlayer)
                                && (currentNode.next.value === currentPlayer)) {
                        this.removeNode(currentNode);
                        turnOver = true;
                        winner = currentPlayer;
                        console.log('Current Player =' + winner);
                        if(currentPlayer === WHITE_COLOR) {
                            currentPlayer = BLACK_COLOR;
                        } else {
                            currentPlayer = WHITE_COLOR;
                        }
                        break;
                    }
                }
                currentNode = currentNode.next;
            }

            if(!turnOver) {
                gameOver = true;
                console.log('Winner Found !!!!!' + winner);
                break;
            }
        }
        if(winner === WHITE_COLOR) {
            return WENDY;
        } else {
            return BOB;
        }
    }

    this.initializeGame(colors);
    return this.playGame();
}


function Node (color) {
    this.value = color;
    this.next = null;
    this.prev = null;    
}

gameChallenger('wwwbbbbwwww');
