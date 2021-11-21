# ParserData
    Парсит данных

## escape(text: string)
    Метод escape удаляет табы, перносы строк

## parse(text: string, shema: object)
    Метод переводит text в object по правилам описаными в shema

### Одно значения

    Пример:
        text: "<h1>text</h1>"
        shema: {
            text: {
                start: '<h1>',
                end: '</h1>',
            }
        }
        return: {
            text: 'text',
        }

### Много значений

    Пример:
        text: "<h1>text1</h1><h1>text2</h1>"
        shema: {
            text: {
                start: '<h1>',
                end: '</h1>',
                isArray: true,
            }
        }
        returns: {
            text: [
                'text1',
                'text2',
            ],
        }

### Повторный парсинг значения

    Пример:
        text: "<h1><b>text</b>bla-bla</h1>"
        shema: {
            text: {
                start: '<h1>',
                end: '</h1>',
                next: {
                    start: '<b>',
                    end: '</b>',
                }
            }
        }
        return: {
            text: 'text',
        }

    Или:
        text: "<h1><b>text1</b><b>text2</b></h1>"
        shema: {
            text: {
                start: '<h1>',
                end: '</h1>',
                next: {
                    start: '<b>',
                    end: '</b>',
                    isArray: true,
                }
            }
        }
        return: {
            text: ['text1', 'text2'],
        }

    Или:
        text: "<h1><b>text1</b>bla-bla</h1><h1><b>text2</b>bla-bla</h1>"
        shema: {
            text: {
                start: '<h1>',
                end: '</h1>',
                next: {
                    start: '<b>',
                    end: '</b>',
                    isArray: true,
                }
                isArray: true,
            }
        }
        return: {
            text: ['text1', 'text2'],
        }

### Парсинг значения в объект

    Пример:
        text: "<h1><b>text1</b>bla-bla</h1><h1><b>text2</b>bla-bla</h1>"
        shema: {
            texts: {
                start: '<h1>',
                end: '</h1>',
                isArray: true,
                nextObject: {
                    text: {
                        start: '<b>',
                        end: '</b>',
                    },
                }
            }
        }
        return: {
            texts: [
                {
                    text: 'text1',
                },
                {
                    text: 'text2',
                },
            ]
        }