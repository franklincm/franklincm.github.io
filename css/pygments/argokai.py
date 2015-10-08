# -*- coding: utf-8 -*-
"""
    Argokai Colorscheme
    ~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Comment, Name, Keyword, Generic, Number, Operator, String

class ArgokaiStyle(Style):

    background_color = '#1B1D1E'
    styles = {
        Token:              'noinherit #f4f4ee bg:#1B1D1E',
        Operator.Word:      'noinherit #ff8036',
        Generic.Deleted:    'noinherit #ff0101 bg:#9a0000',
        Number:             'noinherit',
        Name.Attribute:     'noinherit #A6E22E',
        Comment:            '#465457 italic',
        Name.Constant:      'noinherit #a4ed2d',
        Keyword.Type:       'noinherit #6497c5',
        Number.Float:       'noinherit #F8F8F2',
        Generic.Inserted:   'noinherit #ffffff bg:#006600',
        Keyword:            'noinherit #f64a8a',
        Generic.Error:      'noinherit #870000 bg:#ffa40b',
        Generic.Output:     'noinherit #3a4547',
        Name.Variable:      'noinherit #6497c5',
        Generic.Traceback:  'noinherit #870000 bg:#ffa40b',
        Name.Function:      'noinherit #A6E22E',
        Name.Exception:     'noinherit #e4d00a',
        Name.Tag:           'noinherit #f64a8a',
        String:             'noinherit #6497c5',
        Generic.Heading:    'noinherit #b2b2b2',
        Name.Entity:        'noinherit #ff8da1',
        Comment.Preproc:    'noinherit #A6E22E',
        Generic.Subheading: 'noinherit #b2b2b2',
        Generic.Emph:       'underline',
    }
