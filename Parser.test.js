const { findAll, findOne, parse, fetchHTML, fetchImage} = require('./Parser.js');

test('findAll - одно значение', () => {
    expect(
        findAll('starttextend', 'start', 'end')
    )
    .toEqual(
        ['text']
    )
})


test('findAll - два значения', () => {
    expect(
        findAll('starttext1endstarttext2end', 'start', 'end')
    )
    .toEqual(
        ['text1', 'text2']
    )
})



test('findAll - text не корректный', () => {
    expect(
        findAll(null, 'start', 'end')
    )
    .toEqual(
        []
    )
})

test('findAll - start не корректный', () => {
    expect(
        findAll('starttextend', null, 'end')
    )
    .toEqual(
        []
    )
})

test('findAll - end не корректный', () => {
    expect(
        findAll('starttextend', 'start', null)
    )
    .toEqual(
        []
    )
})

test('findOne - корректное значения', () => {
    expect(
        findOne('starttextend', 'start', 'end')
    )
    .toEqual(
        'text'
    )
})

test('parse - одно значение', () => {
    expect(
        parse('<h1>User</h1>', {
            name: {
                start: '<h1>', 
                end: '</h1>',
            }
        })
    )
    .toEqual(
        {
            name: 'User',
        }
    )
})

test('parse - много значение', () => {
    expect(
        parse('<h1>User1</h1><h1>User2</h1>', {
            names: {
                start: '<h1>', 
                end: '</h1>',
                isArray: true,
            }
        })
    )
    .toEqual(
        {
            names: ['User1', 'User2'],
        }
    )
})

test('parse - повторный парсинг значение', () => {
    expect(
        parse('<h1><b>User</b>bla-bla</h1>', {
            names: {
                start: '<h1>', 
                end: '</h1>',
                next:{
                    start: '<b>',
                    end: '</b>',
                },
            }
        })
    )
    .toEqual(
        {
            names: 'User',
        }
    )
})

test('parse - повторный парсинг значение 2', () => {
    expect(
        parse('<h1><b>User1</b><b>User2</b></h1>', {
            names: {
                start: '<h1>', 
                end: '</h1>',
                next:{
                    start: '<b>',
                    end: '</b>',
                    isArray: true,
                },
            }
        })
    )
    .toEqual(
        {
            names: ['User1', 'User2'],
        }
    )
})

test('parse - повторный парсинг значение 3', () => {
    expect(
        parse('<h1><b>User1</b>bla-bla</h1><h1><b>User2</b>bla-bla</h1>', {
            names: {
                start: '<h1>', 
                end: '</h1>',
                isArray: true,
                next:{
                    start: '<b>',
                    end: '</b>',
                },
            }
        })
    )
    .toEqual(
        {
            names: ['User1', 'User2'],
        }
    )
})



test('parse - парсиг в обьекты', () => {
    expect(
        parse('<h1><b>User1</b>bla-bla</h1><h1><b>User2</b>bla-bla</h1>', {
            names: {
                start: '<h1>', 
                end: '</h1>',
                isArray: true,
                nextObject: {
                    name: {
                        start: '<b>',
                        end: '</b>',
                    },
                },
            }
        })
    )
    .toEqual(
        {
            names: [
                {
                    name: 'User1'
                },
                {
                    name: 'User2'
                }
            ],
        }
    )
})
