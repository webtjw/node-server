ASMOperator 赋值运算符
  语法
    AsmE
      条件表达式
      Yield 表达式
      箭头函数
      异步箭头函数
      LHSE = AsmE
      LHSE AsmO AsmE
    AsmO
      *= /= += -= <<= >>= >>>= &= ^= |= **=
  
  静态语义：早期解析（编译）错误
    AsmE：LHSE = AsmE
      如果 LHSE 是一个对象字面量或数组字面量，且不符合赋值模式的，则为语法错误；
      如果 LHSE 既不是对象字面量也不是数组字面量，且 IsValidSimpleAssignmentTarget(LHSE) 返回 false 时，则为早期引用错误；
    AsmE：LHSE AsmO AsmE
      如果 IsValidSimpleAssignmentTarget(LHSE) 返回 false 时，则为早期引用错误；
  
  运行语义：执行情况
    当 AsmE：LHSE = AsmE
      1，如果 LHSE 既不是对象字面量也不是数组字面量，则
        a，令 lref（left reference 左侧引用值） 为 LHSE 的执行结果
        b，ReturnIfAbrupt(lref)
        c，令 rref 为 AsmE
        d，令 rval 为 GetValue(rref)
        e，如果 IsAnonymousFunctionDefinition(AsmE) 且 IsIdentifierRef(LHSE) 都为 true，且如果 rval 没有 name 属性，则 setFunctionName(rval, GetReferenceedName(lref))
        f，PutValue(lref, rval)
        g，返回 rval
      2，采取 LHSE 定义的 AsmPattern
      3，令 rref 为 AsmE 的执行结果
      4，令 rval 为 GetValue(rref)
      5，根据 AsmPattern 和 rval 进行 DestructuringAssignmentEvaluation 解构赋值；
      6，返回 rval
    当 AsmE：LHSE AsmO AsmE
      1，令 lref 为 LHSE 的执行结果
      2，令 lval 为 GetValue(lref)
      3，令 rref 为 AsmE 的执行结果
      4，令 rval 为 GetValue(rref)
      5，令 op 为 @= AsmO 中的 @
      6，令 r 为执行 lval op rval 的结果
      7，执行 PutValue(lref, r)
      8，return r
