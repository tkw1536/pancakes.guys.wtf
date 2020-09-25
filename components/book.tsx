import * as React from 'react';
import style from './book.module.css';

/**!
    This file has been heavily adapted from:  https://codepen.io/sabanna/pen/ZxQXQv
    which is licensed under the terms of the MIT LICENSE as below.

    Copyright (c) 2019 by Anna Sabatini (https://codepen.io/sabanna/pen/ZxQXQv)

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

export default class Book extends React.Component<{children: React.ReactNode[]}> {
    render() {
        const { children } = this.props;
        return (
            <div className={style.scene}>
                <div className={style["book-wrap"]}>
                <div className={style["left-side"]}>
                    <div className={style["book-cover-left"]}></div>
                    <div className={style.layer1}>
                    <div className={style["page-left"]}></div>
                    </div>
                    <div className={style.layer2}>
                    <div className={style["page-left"]}></div>
                    </div>
                    <div className={style.layer3}>
                    <div className={style["page-left"]}></div>
                    </div>
                    <div className={style.layer4}>
                    <div className={style["page-left"]}></div>
                    </div>
                    <div className={style["layer-text"]}>
                    <div className={style["page-left-2"]}>
                        <div className={style.corner}></div>
                        <div className={style.corner2}></div>
                        <div className={style["corner-fold"]}></div>
                        <div className={style["page-text"] + " " + style["w-richtext"]}>
                            {children[0]}
                        </div>
                    </div>
                    </div>
                </div>
                <div className={style.center}></div>
                <div className={style["right-side"]}>
                    <div className={style["book-cover-right"]}></div>
                    <div className={style.layer1}>
                    <div className={style["page-right"]}></div>
                    </div>
                    <div className={style.layer2 + " " + style.right}>
                    <div className={style["page-right"]}></div>
                    </div>
                    <div className={style.layer3 + " " + style.right}>
                    <div className={style["page-right"]}></div>
                    </div>
                    <div className={style.layer4 + " " + style.right}>
                    <div className={style["page-right"]}></div>
                    </div>
                    <div className={style["layer-text"] + " " + style.right}>
                    <div className={style["page-right-2"]}>
                        <div className={style["page-text"] + " " + style["w-richtext"]}>
                            {children[1]}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}