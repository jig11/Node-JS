const {add, subtract} = require('../utility/calculator');
const chai = require('chai');
const expect = chai.expect;

describe.skip('Calculator',() =>{

    describe('add',() =>{
   
        it('should return 5 for add(2,3)',() =>{
            expect(add(2,3)).to.equal(5);
        })

        it('should return -1 for add(-2,1)',() =>{
            expect(add(-2,1)).to.equal(-1);
        })
    });

    describe('subtract',() =>{
   
        it('should return 1 for subtract(3,2)',() =>{
            expect(subtract(3,2)).to.equal(1);
        });
        
        it('should return -3 for subtract(1, 4)', () => {
            expect(subtract(1, 4)).to.equal(-3);
        });

        it('should return 3 for subtract(7,4)',() =>{
            expect(subtract(7,4)).to.equal(3);
        });
    });

});