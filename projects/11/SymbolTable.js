export class SymbolTable {
  constructor(previousTable) {
    this.previousTable = previousTable;
    this.variables = new Map();
    this.indexes = new Map();
  }

  add(variable) {
    let index = this.indexes.get(variable.kind);
    if (index == null || index == undefined) {
      index = 0;
    }
    this.indexes.set(variable.kind, index + 1);
    this.variables.set(variable.name, {
      ...variable,
      index,
    });
  }

  get(name) {
    let table = this;

    while (table) {
      const variable = table.variables.get(name);
      if (variable) {
        return variable;
      }

      table = table.previousTable;
    }
  }
}

// export class SymbolTable {
//   constructor(tables = []) {
//     this.tables = [...tables];
//     this.tables.push(new Map());
//     this.index = 0;
//   }

//   createScope() {
//     return new SymbolTable(this.tables);
//   }

//   add(variable) {
//     const lastTable = this.tables[this.tables.length - 1];
//     lastTable.set(variable.name, {
//       ...variable,
//       index: this.index++,
//     });
//   }

//   get(name) {
//     for (let i = this.tables - 1; i >= 0; i--) {
//       if (this.tables[i].has(name)) {
//         return this.tables[i].get(name);
//       }
//     }
//   }
// }
