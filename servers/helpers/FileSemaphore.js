function Semaphore() {
    this.count = 1;
    this.waitingList = [];
  
    this.acquire = async function() {
      this.count--;
      if (this.count < 0) {
        await new Promise(resolve => {
          this.waitingList.push(resolve);
        });
      }
    }
  
    this.release = async function() {
      this.count++;
      if (this.count <= 0 && this.waitingList.length > 0) {
        const next = this.waitingList.shift();
        next();
      }
    }
  }

module.exports = Semaphore;