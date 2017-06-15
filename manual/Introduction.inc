%%
%% This file may be distributed and/or modified under the
%% conditions of the LaTeX Project Public License, either version 1.3a
%% of this license or (at your option) any later version.
%% The latest version of this license is in:
%%
%% http://www.latex-project.org/lppl.txt
%%

\input docstrip

\askforoverwritefalse
%\askonceonly
\showprogress
\keepsilent


\nopreamble
\nopostamble
\generate{
\file{NounModel.dtd}{\from{\jobname.dtx}{NounModel.dtd}}
\file{NounModel.cfg}{\from{\jobname.dtx}{cfg}}
}

\ifToplevel{%
  \Msg{***********************************************************}
  \Msg{*}
  \Msg{* To finish the installation you have to move the following}
  \Msg{* files into a directory searched by TeX:}
  \Msg{*}
  \Msg{* The recommended directory is TEXMF/tex/latex/thuthesis}
  \Msg{*}
  \Msg{* \space\space thuthesis.cls}
  \Msg{* \space\space thuthesis.cfg}
  \Msg{*}
  \Msg{* To produce the documentation run the files ending with}
  \Msg{* `.dtx' through LaTeX.}
  \Msg{*}
  \Msg{* Happy TeXing!}
  \Msg{***********************************************************}}

\endbatchfile
