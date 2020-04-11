import { promises } from 'fs';

const compMap = {
  '0': '0101010',
  '1': '0111111',
  '-1': '0111010',
  D: '0001100',
  A: '0110000',
  M: '1110000',
  '!D': '0001101',
  '!A': '0110001',
  '!M': '1110001',
  '-D': '0001111',
  '-A': '0110011',
  '-M': '1110011',
  'D+1': '0011111',
  'A+1': '0110111',
  'M+1': '1110111',
  'D-1': '0001110',
  'A-1': '0110010',
  'M-1': '1110010',
  'D+A': '0000010',
  'D+M': '1000010',
  'D-A': '0010011',
  'D-M': '1010011',
  'A-D': '0000111',
  'M-D': '1000111',
  'D&A': '0000000',
  'D&M': '1000000',
  'D|A': '0010101',
  'D|M': '1010101',
};

const destMap = {
  NULL: '000',
  M: '001',
  D: '010',
  MD: '011',
  A: '100',
  AM: '101',
  AD: '110',
  AMD: '111',
};

const jumpMap = {
  NULL: '000',
  JGT: '001',
  JEQ: '010',
  JGE: '011',
  JLT: '100',
  JNE: '101',
  JLE: '110',
  JMP: '111',
};

class Parser {
  symbols = {
    R0: 0,
    R1: 1,
    R2: 2,
    R3: 3,
    R4: 4,
    R5: 5,
    R6: 6,
    R7: 7,
    R8: 8,
    R9: 9,
    R10: 10,
    R11: 11,
    R12: 12,
    R13: 13,
    R14: 14,
    R15: 15,
    SP: 0,
    LCL: 1,
    ARG: 2,
    THIS: 3,
    THAT: 4,
    SCREEN: 0x4000,
    KBD: 0x6000,
  };

  labelRegex = /\((.*)\)/;
  variableCounter = 16;

  constructor(filename) {
    this.filename = filename;
  }

  async parse() {
    const lines = await this.readLines();
    this.loadLabels(lines);
    return lines.map(line => this.parseLine(line)).filter(line => line);
  }

  async readLines() {
    return (await promises.readFile(this.filename, 'utf8'))
      .split('\n')
      .map(line => {
        const commentStart = line.indexOf('//');
        if (commentStart === -1) {
          return line;
        }
        return line.substring(0, commentStart);
      })
      .map(line => line.trim())
      .filter(line => line);
  }

  loadLabels(lines) {
    let labelsCount = 0;
    lines.forEach((line, i) => {
      const match = line.match(this.labelRegex);
      if (match) {
        this.symbols[match[1]] = i - labelsCount;
        labelsCount++;
      }
    });
  }

  parseLine(line) {
    if (line.startsWith('@')) {
      return this.parseACommand(line);
    }
    if (line.startsWith('(')) {
      return undefined;
    }
    return this.parseCCommand(line);
  }

  parseACommand(line) {
    let literal = line.substring(1);
    if (isNaN(literal)) {
      let value = this.symbols[literal];
      if (value == undefined) {
        value = this.variableCounter++;
        this.symbols[literal] = value;
      }
      literal = value;
    }
    const binary = parseInt(literal, 10)
      .toString(2)
      .padStart(16, '0');
    return binary;
  }

  parseCCommand(line) {
    line = line.toUpperCase();
    const dest = this.getDest(line);
    const comp = this.getComp(line);
    const jump = this.getJump(line);
    return `111${compMap[comp]}${destMap[dest]}${jumpMap[jump]}`;
  }

  getDest(line) {
    const end = line.indexOf('=');
    if (end === -1) {
      return 'NULL';
    }
    return line.substring(0, end).trim();
  }

  getComp(line) {
    let start = line.indexOf('=') + 1;
    if (start === 0) {
      start = 0;
    }
    let end = line.indexOf(';');
    if (end === -1) {
      end = line.length;
    }
    return line.substring(start, end).trim();
  }

  getJump(line) {
    const start = line.indexOf(';') + 1;
    if (start === 0) {
      return 'NULL';
    }
    return line.substring(start).trim();
  }
}

async function main() {
  const inputFile = process.argv[2];
  const parser = new Parser(inputFile);
  const bytecode = await parser.parse();
  let outputFile = process.argv[3];
  if (!outputFile) {
    const extensionStart = inputFile.lastIndexOf('.');
    if (extensionStart === -1) {
      extensionStart = inputFile.length;
    }
    outputFile = inputFile.substring(0, extensionStart) + '.hack';
  }
  await promises.writeFile(outputFile, bytecode.join('\n'));
}

main();
