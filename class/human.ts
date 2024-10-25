export class Rational {
    private numerator: number;
    private denominator: number;

    
    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("Denominator cannot be zero.");
        }
        this.numerator = numerator;
        this.denominator = denominator;
        this.normalize();  // 自動規範化
    }

    
    public getNumerator(): number {
        return this.numerator;
    }

    public getDenominator(): number {
        return this.denominator;
    }

   
    public normalize(): Rational {
        const gcd = this.greatestCommonDivisor(Math.abs(this.numerator), Math.abs(this.denominator));
        this.numerator /= gcd;
        this.denominator /= gcd;

       
        if (this.denominator < 0) {
            this.numerator = -this.numerator;
            this.denominator = -this.denominator;
        }

        return this;
    }

    private greatestCommonDivisor(a: number, b: number): number {
        return b === 0 ? a : this.greatestCommonDivisor(b, a % b);
    }


    public isWhole(): boolean {
        return this.denominator === 1;
    }

  
    public isDecimal(): boolean {
        return !this.isWhole();
    }

  
    public equals(numerator: number, denominator: number): boolean {
        const other = new Rational(numerator, denominator).normalize();
        const current = new Rational(this.numerator, this.denominator).normalize();
        return current.numerator === other.numerator && current.denominator === other.denominator;
    }

  
    public equalsRational(other: Rational): boolean {
        const thisNormalized = this.normalize();
        const otherNormalized = other.normalize();
        return thisNormalized.numerator === otherNormalized.numerator &&
               thisNormalized.denominator === otherNormalized.denominator;
    }

   
    public static parseRational(numeratorArray: string[], denominatorArray: string[]): Rational {
        const numerator = parseInt(numeratorArray.join(''));
        const denominator = parseInt(denominatorArray.join(''));
        return new Rational(numerator, denominator);
    }

  
    public static parseRationalFromString(rationalString: string): Rational {
        const parts = rationalString.split('/');
        if (parts.length !== 2) {
            throw new Error("Invalid format for Rational string.");
        }
        const numerator = parseInt(parts[0]);
        const denominator = parseInt(parts[1]);
        return new Rational(numerator, denominator);
    }


    public toString(): string {
        return `${this.numerator}/${this.denominator}`;
    }
}
