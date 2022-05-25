import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { createSingleton } from 'tippy.js';
import { ToolTipDirective } from './tool-tip.directive';

@Directive({
  selector: '[appToolTipSingleton]'
})
export class ToolTipSingletonDirective implements AfterViewInit {

  @ContentChildren(ToolTipDirective, {descendants: true}) 
  elementsWithTooltips: QueryList<ToolTipDirective>

  singletonInstance: any;

  constructor() { }

  ngAfterViewInit() {
    this.singletonInstance = createSingleton(this.getTippyInstances(),{
      delay: [400, 0],
      moveTransition:'transform 0.2s ease-out'
    })

    this.elementsWithTooltips.changes.subscribe(() => {
      this.singletonInstance.singletonInstance(this.getTippyInstances)
    })

  }

  getTippyInstances(){
    return this.elementsWithTooltips
      .toArray()
      .map(t => t.tippyInstance)

  }

}
