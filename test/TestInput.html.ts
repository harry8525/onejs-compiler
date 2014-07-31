import LeftNavModel = require('LeftNavModel');
import DomUtils = require('DomUtils');
import View = require('View');
import ImageSprite = require('ImageSprite');
import Repeater = require('Repeater');
import LeftNavcss = require('LeftNav.css');

DomUtils.loadStyles(LeftNavcss.styles);

class LeftNavBlock2Item extends View {
    viewName = 'LeftNavBlock2Item';

    onRenderHtml(): string {
        return '' +
            '<a id="' + this.id + '_0" ' + this._genClass('sub link', ['isSelected','$parent.isSelected']) + ' ' + this._genAttr('', ['href','link.url']) + '>' +
                this._genText('link.text') +
            '</a>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "isSelected": "$parent.isSelected"
            },
            "attr": {
                "href": "link.url"
            },
            "text": "link.text"
        }
    ];
}

class LeftNavBlock2 extends Repeater {
    viewName = 'LeftNavBlock2';
    childViewType = LeftNavBlock2Item;
    itemName = "link";

    onRenderHtml(): string {
        return '' +
            '<div id="' + this.id + '_0">' +
                this.renderItems() + 
            '</div>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class LeftNavBlock1Item extends View {
    viewName = 'LeftNavBlock1Item';
    private leftNavBlock2: LeftNavBlock2 = <LeftNavBlock2>this.addChild(new LeftNavBlock2());

    onInitialize() {
        this.leftNavBlock2.owner = this.owner;
    }

    onViewModelChanged() {
        this.leftNavBlock2.setData({ items: this.getValue('link.links') });
    }

    onRenderHtml(): string {
        return '' +
            '<a id="' + this.id + '_0" ' + this._genClass('link', ['isSelected','$viewModel.isSelected']) + ' ' + this._genAttr('', ['href','link.url']) + '>' +
                this._genText('link.text') +
            '</a>' +
            this.leftNavBlock2.renderHtml() +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "isSelected": "$viewModel.isSelected"
            },
            "attr": {
                "href": "link.url"
            },
            "text": "link.text"
        }
    ];
}

class LeftNavBlock1 extends Repeater {
    viewName = 'LeftNavBlock1';
    childViewType = LeftNavBlock1Item;
    itemName = "link";

    onRenderHtml(): string {
        return '' +
            '<div id="' + this.id + '_0" class="linkGroup">' +
                this.renderItems() + 
            '</div>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class LeftNavBlock0Item extends View {
    viewName = 'LeftNavBlock0Item';
    private leftNavBlock1: LeftNavBlock1 = <LeftNavBlock1>this.addChild(new LeftNavBlock1());

    onInitialize() {
        this.leftNavBlock1.owner = this.owner;
    }

    onViewModelChanged() {
        this.leftNavBlock1.setData({ items: this.getValue('group.links') });
    }

    onRenderHtml(): string {
        return '' +
            this.leftNavBlock1.renderHtml() +
            '';
    }
}

class LeftNavBlock0 extends Repeater {
    viewName = 'LeftNavBlock0';
    childViewType = LeftNavBlock0Item;
    itemName = "group";

    onRenderHtml(): string {
        return '' +
            '<div id="' + this.id + '_0" class="linkArea">' +
                this.renderItems() + 
            '</div>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class LeftNav extends View {
    viewName = 'LeftNav';
    viewModelType = LeftNavModel;
    private searchIcon: ImageSprite = <ImageSprite>this.addChild(new ImageSprite());
    private leftNavBlock0: LeftNavBlock0 = <LeftNavBlock0>this.addChild(new LeftNavBlock0());

    onInitialize() {
        this.leftNavBlock0.owner = this;
    }

    onViewModelChanged() {
        this.searchIcon.setData(this.getValue('searchIcon'));
        this.leftNavBlock0.setData({ items: this.getValue('linkGroups') });
    }

    onRenderHtml(): string {
        return '' +
            '<div class="c-LeftNavBar">' +
                '<div class="searchBox">' +
                    '<span id="' + this.id + '_0">' +
                        this._genText('searchText') +
                    '</span>' +
                    this.searchIcon.renderHtml() +
                '</div>' +
                '<div class="scrollArea">' +
                    this.leftNavBlock0.renderHtml() +
                    '<div class="c-QuotaPane">' +
                        '<div class="quota">' +
                            '37.4GB available' +
                        '</div>' +
                        '<a class="link" href="#">' +
                            'Recycle bin' +
                        '</a>' +
                        '<a class="link" href="#">' +
                            'Manage storage' +
                        '</a>' +
                        '<a class="link" href="#">' +
                            'Get SkyDrive apps' +
                        '</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "text": "searchText"
        }
    ];
}

export = LeftNav;